import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ROLE_ADMIN } from "~/utils/constants";
const isLoginPage = (url: string) => {
  return url.includes("/auth/login");
};
export function middleware(request: NextRequest) {
  const isToken = !!request.cookies?.get("accessToken")?.value;
  const profile = !!request?.cookies?.get("profile")?.value
    ? JSON.parse(request?.cookies?.get("profile")?.value || '')
    : {};
  const isUser = profile.level !== ROLE_ADMIN.value;
  const isChangePassword = profile.first;
  let url = "/auth/login";
  if (isToken && isLoginPage(request.url)) {
    url = "/";
    if (isUser) {
      if (isChangePassword) {
        url = "/user/change-password";
      } else {
        url = "/user/receipts";
      }
    }
  }
  return isToken !== isLoginPage(request.url)
    ? NextResponse.next()
    : NextResponse.redirect(new URL(url, request.url));
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|404|500|robots.txt|sitemap.xml).*)",
  ],
};
