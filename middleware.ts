import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || '';
  const response = NextResponse.next();

  // CRITICAL: NEVER redirect or rewrite URLs
  // The root path (/) must always stay at (/) to allow app/page.tsx to render
  // Only set headers for portfolio type detection

  // Check for admin switcher cookie (for localhost testing)
  const portfolioType = request.cookies.get('portfolio-type')?.value;

  // Determine portfolio type based on subdomain
  let portfolio: 'web2' | 'web3' | 'combined' = 'combined';

  // For localhost (any port: 3000, 3001, etc.), default to 'combined' unless cookie is set
  if (hostname.includes('localhost') || hostname.includes('127.0.0.1')) {
    if (portfolioType) {
      portfolio = portfolioType as 'web2' | 'web3' | 'combined';
    } else {
      // Default localhost to combined view
      portfolio = 'combined';
    }
  } else if (hostname.includes('web3.') || hostname.split('.')[0] === 'web3') {
    portfolio = 'web3';
  } else if (hostname.includes('web2.') || hostname.split('.')[0] === 'web2') {
    portfolio = 'web2';
  } else {
    // Combined portfolio (main domain, www, portfolio subdomain)
    portfolio = 'combined';
  }

  // Pass portfolio type via header - DO NOT redirect or rewrite
  response.headers.set('x-portfolio-type', portfolio);
  
  return response;
}

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
