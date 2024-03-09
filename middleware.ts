export { default } from "next-auth/middleware"

export const config = { matcher: ["/profile/:path*", "/project/:path*", "/projects/:path*"] }