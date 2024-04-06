import { NextRequest, NextResponse } from "next/server";
import {postNewComment} from "@/actions/githubComments";

export async function GET(req: NextRequest, res: NextResponse) {

    const result = await postNewComment({
        issueId: 3,
        body: '### Cool'
    })

    try {
        return NextResponse.json(
            {
                "status": 200,
                "res" : result
            }
        )
    } catch (error) {
        console.error(error);
        // res.status(500).json({ message: 'Error fetching image' });
    }
}
