import { NextRequest, NextResponse } from "next/server"

export function middleware(req: NextRequest) {
  const token = req.cookies.get("beast_token")?.value
  const isLogin = req.nextUrl.pathname.startsWith("/login")

  if (!token && !isLogin) {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  if (token && isLogin) {
    return NextResponse.redirect(new URL("/", req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.svg$).*)"],
}
