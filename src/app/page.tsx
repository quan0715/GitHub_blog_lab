
import React from 'react'
import { getGithubUser } from "@/actions/githubOauth";
import { getIssueList } from "@/actions/githubIssue";
import { OAuthButton, UserAvatar} from "@/ui/OauthButton";
import { cookies } from "next/headers";

import {IssueCoverCard} from "@/ui/IssueCoverCard";
import {ThemeSwitcherButton} from "@/components/blocks/ToggleThemeButton";

export default async function Home() {

    const token = cookies().get('access_token')

    let userProfile = {userName: '', avatar: ''};

    if(token !== undefined){
        userProfile = await getGithubUser()
    }

    const issueList = await getIssueList()

    return (
        <main className={"m-12"}>
            <div className={"flex flex-row justify-between px-12 py-4"}>
                <section>
                    <div>Quan 的 Blog</div>
                </section>
                <div className={"flex flex-row justify-end space-x-2"}>
                    <ThemeSwitcherButton/>
                    {
                        userProfile.userName.length === 0
                            ? <OAuthButton/>
                            : <UserAvatar avatar={userProfile.avatar} userName={userProfile.userName}/>
                    }
                </div>
            </div>
            <div
                className={"w-full h-48 bg-blue-100 dark:bg-blue-600 rounded-xl flex flex-col justify-center items-center gap-y-5"}>
                <p className="text-xl font-bold">Quan 的 Blog</p>
                <p className={"text-sm font-light flex flex-col justify-center items-center"}>
                    <span>Welcome to Quan 的 Blog 順便當作 Dcard 2024 實習 Intern Demo</span>
                    <span className={"text-sm font-extralight"}> power by Github Issue</span>
                </p>
            </div>
            <div className={"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-4"}>
                {
                    issueList.map((issue) => {
                        return (
                            // <Link href={`/${issue.number}`}>
                                <IssueCoverCard key={issue.id} issue={issue}/>
                            // </Link>
                        )
                    })
                }
            </div>
        </main>
    )
}
