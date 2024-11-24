import { NextResponse } from 'next/server';

export function middleware(request) {
    const token = request.cookies.get('token')?.value;

    // If no token, redirect to login
    if (!token) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // Allow the request to proceed if the token is present
    return NextResponse.next();
}

// Specify the protected routes
export const config = {
    matcher: ['/dashboard/:path*'], // Protect `/dashboard` and its subroutes
};
