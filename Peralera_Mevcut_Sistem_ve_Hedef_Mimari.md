# Peralera Dijital Sadakat Sistemi

## 1. Mevcut Sistem (Single-Tenant)

### Genel Yapı

Mevcut sistem yalnızca **tek bir işletme** için çalışmaktadır.

Örnek: - `jays.peralera.com`

Sistemde üç farklı kullanıcı rolü bulunmaktadır:

-   **Müşteri**
-   **Kasiyer**
-   **Yönetici**

### Kullanıcı Akışı

#### Müşteri

-   Kayıt ekranından kayıt olur.
-   Varsayılan rolü **CUSTOMER** olarak atanır.
-   Giriş yaptıktan sonra müşteri paneline yönlendirilir.
-   Kasiyerin oluşturduğu QR kodunu taratarak çekirdek kazanır.
-   Yeterli çekirdeğe ulaştığında ödül kullanmak için QR kodu oluşturur.

#### Kasiyer

-   Yönetici tarafından oluşturulur.
-   Kasiyer panelinde:
    -   Çekirdek kazandıran QR oluşturur.
    -   Müşterinin ödül QR kodunu okutarak ödülü onaylar.

#### Yönetici

-   İşletmeye ait istatistikleri görüntüler.
-   Kasiyer hesaplarını oluşturur.
-   İşletmeyi yönetir.

------------------------------------------------------------------------

## Teknik Yapı

-   Next.js
-   Vercel
-   Supabase
-   Tek deployment
-   Tek veritabanı
-   Tek işletme

------------------------------------------------------------------------

# Hedef Sistem (Multi-Tenant SaaS)

## Amaç

Peralera'yı yüzlerce işletmenin kullanabileceği merkezi bir SaaS
platformuna dönüştürmek.

Artık her işletme ayrı bir proje olmayacak.

Tek kod tabanı, Tek veritabanı, Tek deployment kullanılacak.

------------------------------------------------------------------------

## Roller

Platformda dört farklı rol bulunacak:

-   SUPER_ADMIN
-   ADMIN
-   CASHIER
-   CUSTOMER

------------------------------------------------------------------------

## Super Admin

Sistemin tek sahibi olacaktır.

Giriş adresi örnekleri:

-   panel.peralera.com
-   app.peralera.com

Yetkileri:

-   Yeni kafe oluşturmak
-   Kafeleri düzenlemek
-   Logo yüklemek
-   Tema seçmek
-   İlk yöneticiyi oluşturmak
-   Tüm platform istatistiklerini görmek

------------------------------------------------------------------------

## Yeni Kafe Oluşturma

Super Admin panelinde:

-   Kafe adı
-   Slug
-   Logo
-   Tema

girilecek.

Kaydedildiğinde otomatik olarak:

-   Business kaydı oluşacak.
-   Subdomain aktif olacak.

Örnek:

-   jays.peralera.com
-   moka.peralera.com
-   coffeelab.peralera.com

Deployment yapılmayacak.

------------------------------------------------------------------------

## İşletme (Business)

Her kafe bir Business kaydı olacaktır.

Örnek alanlar:

-   id
-   name
-   slug
-   logo
-   theme
-   createdAt

------------------------------------------------------------------------

## Kullanıcılar

Her kullanıcı artık bir işletmeye bağlı olacaktır.

Alanlar:

-   id
-   businessId
-   role
-   name
-   phone

Roller:

-   SUPER_ADMIN
-   ADMIN
-   CASHIER
-   CUSTOMER

------------------------------------------------------------------------

## Subdomain Mantığı

İstek:

jays.peralera.com

↓

Middleware

↓

Slug = jays

↓

Business bulunur

↓

BusinessId elde edilir

↓

Uygulamanın tamamı bu Business üzerinden çalışır.

------------------------------------------------------------------------

## Giriş Sistemi

Her işletme kendi giriş ekranını kullanacaktır.

Örneğin:

jays.peralera.com/login

Sadece Jays Cafe kullanıcıları giriş yapabilecektir.

------------------------------------------------------------------------

## Yönetici Paneli

Admin yalnızca kendi işletmesini görebilecektir.

Tüm sorgular:

WHERE businessId = currentBusiness

mantığıyla çalışacaktır.

------------------------------------------------------------------------

## Kasiyer

Kasiyer sadece kendi işletmesinde işlem yapacaktır.

İşlemler:

-   Çekirdek QR oluşturma
-   Ödül QR okutma

------------------------------------------------------------------------

## Müşteri

Müşteri yalnızca kayıt olduğu işletmenin sadakat kartını kullanacaktır.

İşlemler:

-   QR taratma
-   Çekirdek kazanma
-   Ödül QR oluşturma

------------------------------------------------------------------------

## Tema Sistemi

Her işletme kendine ait:

-   Logo
-   Ana renk
-   Tema

kullanabilecektir.

Kod değişmeyecek.

Sadece tema ayarları değişecektir.

------------------------------------------------------------------------

## İstatistikler

Her işletme yalnızca kendi verilerini görecektir.

Super Admin ise:

-   Toplam işletme
-   Toplam kullanıcı
-   Toplam taratma
-   Toplam ödül
-   Aktif abonelikler
-   Gelir

gibi platform geneli verileri görüntüleyebilecektir.

------------------------------------------------------------------------

# Hedef Mimari

Peralera │ ├── Super Admin │ ├── Jays Cafe │ ├── Admin │ ├── Kasiyer │
└── Müşteriler │ ├── Moka Cafe │ ├── Admin │ ├── Kasiyer │ └──
Müşteriler │ └── Coffee Lab ├── Admin ├── Kasiyer └── Müşteriler

------------------------------------------------------------------------

# Nihai Hedef

Tek platform üzerinden:

-   Yeni işletme oluşturmak
-   Dakikalar içinde yayına almak
-   Her işletmeye özel alan adı, logo ve tema sunmak
-   Aynı kod tabanını tüm müşteriler için kullanmak
-   Ölçeklenebilir profesyonel bir SaaS altyapısı oluşturmak
