import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};

export default function middleware(req: NextRequest) {
  const url = req.nextUrl;

  // Statik dosyaları (görseller vb.) muaf tut
  if (url.pathname.match(/\.(svg|png|jpg|jpeg|gif|webp|ico)$/)) {
    return NextResponse.next();
  }

  // Base domain'i environment variable'dan al (varsayılan: peralera.com)
  const baseDomainEnv = process.env.NEXT_PUBLIC_BASE_DOMAIN || 'peralera.com';

  const hostname = req.headers.get('host') || baseDomainEnv;
  const cleanHostname = hostname.split(':')[0];

  const searchParams = req.nextUrl.searchParams.toString();
  const path = `${url.pathname}${
    searchParams.length > 0 ? `?${searchParams}` : ''
  }`;

  // Süper Admin paneli kontrolleri
  if (
    cleanHostname === `app.${baseDomainEnv}` ||
    cleanHostname === `panel.${baseDomainEnv}` ||
    cleanHostname === 'app.localhost' ||
    cleanHostname === 'panel.localhost'
  ) {
    if (url.pathname.startsWith('/panel')) {
      const newPath = url.pathname.replace('/panel', '') || '/';
      return NextResponse.redirect(new URL(newPath, req.url));
    }
    return NextResponse.rewrite(new URL(`/panel${path}`, req.url));
  }

  // İşletme (Tenant) Subdomain Yakalama
  const isLocalhost = cleanHostname.endsWith('localhost');
  const baseDomain = isLocalhost ? 'localhost' : baseDomainEnv;

  if (
    cleanHostname !== baseDomain &&
    cleanHostname.endsWith(`.${baseDomain}`)
  ) {
    const slug = cleanHostname.replace(`.${baseDomain}`, '');
    return NextResponse.rewrite(new URL(`/${slug}${path}`, req.url));
  }

  // Kök alan adı (Ana tanıtım sitesi)
  if (cleanHostname === baseDomain) {
    if (url.pathname.startsWith('/panel')) {
      return NextResponse.next();
    }
    return NextResponse.rewrite(new URL(`/home${path}`, req.url));
  }

  return NextResponse.next();
}
