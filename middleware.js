import { NextResponse } from "next/server";
import PocketBase from "pocketbase";

const pb = new PocketBase("http://127.0.0.1:8090");

export function middleware(request) {
    const cookie = request.headers.get("Cookie");
    
    if (!cookie && request.nextUrl.pathname.startsWith("/login") || request.nextUrl.pathname.startsWith("/register")) {
        return;
    }
    let isValid = cookie !== undefined;
    if (isValid) {
        pb.authStore.loadFromCookie(cookie);
        isValid = pb.authStore.isValid;
    }
    
    if (!isValid&& !request.nextUrl.pathname.startsWith("/login") && !request.nextUrl.pathname.startsWith("/register")) {
        return Response.redirect(new URL("/login", request.url));
    } 
    

}
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
