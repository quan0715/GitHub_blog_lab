
import React from 'react'
import { getAllIssue } from "@/actions/githubIssue"
import { IssueCoverCard } from "@/components/blocks/IssueCoverCard"
import { EditPostButton } from "@/components/blocks/client/EditPostButton"
import {UserProvider} from "@/Providers/UserProvider"
import {GithubUserModelProps} from "@/models/IssueModel";
import {IssueDisplayList} from "@/components/blocks/client/IssueDisplayList";
import {NavBar} from "@/components/blocks/client/NavBar";

export default async function Home() {

    const fetchRes = await getAllIssue()

    return (
        <div className={"p-6"}>
            {
                <div className={"fixed bottom-4 right-4 md:bottom-8 md:right-8"}>
                    <EditPostButton/>
                </div>
            }
            <div className={"w-full h-48 rounded-xl flex flex-col justify-center items-center gap-y-5"}>
                {/*<p test className="text-xl font-bold">Quan 的 Blog</p>*/}
                <p id={"welcome-message"} className={"text-sm font-light flex flex-col justify-center items-center"}>
                    <span>Welcome to Quan 的 Blog 順便當作 Dcard 2024 實習 Intern Demo</span>
                    <span className={"text-sm font-extralight"}> power by Github Issue</span>
                </p>
            </div>
            <IssueDisplayList issueData={fetchRes.data} nextURL={fetchRes.next}/>
        </div>
    )
}
