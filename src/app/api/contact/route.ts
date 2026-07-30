import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { logo, mascot, primaryColor, email, phone, name, businessName } = data;

    // Check if SMTP configuration exists in environment variables
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : 587;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const contactEmail = process.env.CONTACT_EMAIL || 'hello@peralera.com'; // Fallback to hello@peralera.com

    if (!smtpHost || !smtpUser || !smtpPass) {
      console.warn("SMTP credentials missing in .env. Email was not sent.");
      console.log("Form Data Submitted:", data);
      
      return NextResponse.json(
        { success: true, message: 'Demo talebiniz başarıyla alındı (simüle edildi - SMTP ayarlanmamış).' },
        { status: 200 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465, // true for 465, false for other ports
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const logoText = logo?.startsWith('blob:') ? 'Kullanıcı kendi logosunu yükledi (Blob URL)' : (logo || 'Seçilmedi');
    const mascotText = mascot?.startsWith('blob:') ? 'Kullanıcı kendi maskotunu yükledi (Blob URL)' : (mascot || 'Seçilmedi');

    const mailOptions = {
      from: `"Peralera Sistem" <${smtpUser}>`,
      to: contactEmail,
      subject: `Yeni Demo Talebi: ${businessName || name || 'İsimsiz'}`,
      text: `
      Yeni bir demo talebi aldınız!

      İletişim Bilgileri:
      İsim: ${name || 'Belirtilmedi'}
      İşletme Adı: ${businessName || 'Belirtilmedi'}
      E-posta: ${email || 'Belirtilmedi'}
      Telefon: ${phone || 'Belirtilmedi'}

      Uygulama Tercihleri:
      Logo: ${logoText}
      Maskot: ${mascotText}
      Ana Renk: ${primaryColor || 'Belirtilmedi'}
      `,
      html: `
      <h3>Yeni bir demo talebi aldınız!</h3>
      <h4>İletişim Bilgileri:</h4>
      <ul>
        <li><strong>İsim:</strong> ${name || 'Belirtilmedi'}</li>
        <li><strong>İşletme Adı:</strong> ${businessName || 'Belirtilmedi'}</li>
        <li><strong>E-posta:</strong> ${email || 'Belirtilmedi'}</li>
        <li><strong>Telefon:</strong> ${phone || 'Belirtilmedi'}</li>
      </ul>
      <h4>Uygulama Tercihleri:</h4>
      <ul>
        <li><strong>Logo:</strong> ${logoText}</li>
        <li><strong>Maskot:</strong> ${mascotText}</li>
        <li><strong>Ana Renk:</strong> <span style="display:inline-block; width:15px; height:15px; background-color:${primaryColor};"></span> ${primaryColor || 'Belirtilmedi'}</li>
      </ul>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: 'Demo talebiniz başarıyla iletildi.' }, { status: 200 });
  } catch (error: any) {
    console.error('Email sending error:', error);
    return NextResponse.json(
      { success: false, message: 'Mail gönderilirken bir hata oluştu.', error: error.message },
      { status: 500 }
    );
  }
}
