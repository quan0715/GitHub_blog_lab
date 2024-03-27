import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(req: NextRequest) {
    // logout
    // clear login token
    console.log('clear token')
    cookies().set('access_token', '', {
        maxAge: 0
    })
    return NextResponse.redirect(new URL("/", req.nextUrl));
}
