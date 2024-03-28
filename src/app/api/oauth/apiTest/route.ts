import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getGithubIssues } from "@/actions/githubOauth"


export async function GET(req: NextRequest) {

    const res = await getGithubIssues()
    // return NextResponse.redirect(new URL("/", req.nextUrl));
    return NextResponse.json(
        {
            'message': 'api test route',
            'result' : res
        }
    )
}
