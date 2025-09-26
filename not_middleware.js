// import { NextResponse } from 'next/server'
// import { authenticate } from './lib/actions/auth'

// // Note: all the log statements are for debugging
// export async function middleware(request) {
//     console.log("The middleware is working")
//     const isAuthenticated = await authenticate()
    
//     if (request.nextUrl.pathname.startsWith('/dashboard')) {
//         console.log("The rquest contains /dashboard")
        
//         // If the user is authenticated, continue as normal
//         if (isAuthenticated) {
//             console.log("The user is authenticated... granting access to dashbord ")
//             return NextResponse.next()
//         }
        
//         // Redirect to login page if not authenticated
//         console.log("The user is not authenticated... redirecting to login page")
//         return NextResponse.redirect(new URL('/login', request.url))
//     }

//     if (request.nextUrl.pathname.startsWith('/login')) {
//         console.log("The rquest contains /login")
        
//         // If the user is authenticated, redirect to dashbord
//         if (isAuthenticated) {
//             console.log("The user is already logged in... redirecting to dashbord ")
//             return NextResponse.redirect(new URL('/dashboard', request.url))
//         }
        
//         // Continue to login page if not authenticated
//         console.log("The user is not authenticated... continuing  to login page")
//         return NextResponse.next()
//     }

// }

// export const config = {
//     matcher: ['/dashboard', '/login']
// }