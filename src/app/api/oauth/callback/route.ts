import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(req: NextRequest) {
    console.log('req', req)
    // get query params
    const query  = req.nextUrl.searchParams
    const code = query.get('code')
    // get access token
    const postBody = {
        client_id: process.env.GITHUB_CLIENT_ID,
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

    // store access token in session
    console.log('set token to cookies', accessToken)
    cookies().set('access_token', accessToken)

    return NextResponse.redirect(new URL("/", req.nextUrl));
}
