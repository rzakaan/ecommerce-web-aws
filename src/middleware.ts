import { NextResponse, NextRequest } from "next/server";

const isLoggedIn: boolean = true;
const pages = ["login", "register"];

function checkRequest(req: NextRequest) {
  let base = req.url.split("/");
  let url = base[base.length -1]
  if (isLoggedIn || url in pages) { 
    return true;
  } else {
    return false;
  }
}

function checkSession(req: NextRequest) {
  let session = req.cookies.get("session");
  if (session == undefined) {
    return false;
  } else {
    // check session
    return true;
  }
}

export function middleware(req: NextRequest) {
  if (checkRequest(req)) {
    // return NextResponse.next();
  }

  if (checkSession(req)) {
    // return NextResponse.next();
  }

  // return NextResponse.redirect(new URL("/login", req.url));
}

export const config = {
 // matcher: ['/login'],
}