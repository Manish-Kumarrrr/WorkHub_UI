import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl; // Get the current pathname
  const authCookie = request.cookies.get('Authorization'); // Check for the Authorization cookie

  // Define protected routes
  const protectedRoutes = ['/feed','/mypost'];
  
console.warn(authCookie)
  // Check if the current route is protected
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    if (!authCookie) {
      // Redirect to login if the Authorization cookie is missing
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // Allow the request to continue if it's not a protected route or if the user is authenticated
  return NextResponse.next();
}
