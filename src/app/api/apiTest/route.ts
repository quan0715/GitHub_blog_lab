import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getGithubIssues } from "@/actions/githubOauth"
// import {getAssets} from "@/actions/githubIssue";


export async function GET(req: NextRequest, res: NextResponse) {

    try {
        return NextResponse.json(
            {
                "status": 200,
                "res" : res
            }
        )
    } catch (error) {
        console.error(error);
        // res.status(500).json({ message: 'Error fetching image' });
    }
}
