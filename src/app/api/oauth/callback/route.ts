import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(req: NextRequest) {
    console.log('req', req)
    // get query params
    const query  = req.nextUrl.searchParams
    const code = query.get('code')
    // get access token
    const postBody = {
        client_id: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code: code
    }
    const uri = 'https://github.com/login/oauth/access_token'
    const response = await fetch(uri, {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postBody)
        }
    )

    const json = await response.json()
    const accessToken = json['access_token']
    const refreshToken = json['refresh_token']

    console.log('access token', accessToken)
    console.log('refresh token', refreshToken)
    // store access token in session
    console.log('set token to cookies', accessToken)
    cookies().set('access_token', accessToken)
    cookies().set('refresh_token', refreshToken)

    return NextResponse.redirect(new URL("/", req.nextUrl));
}
