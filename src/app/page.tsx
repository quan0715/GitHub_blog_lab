
import React from 'react'
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/navbar"
import { getGithubUser } from "@/actions/githubOauth";
import { getIssueList } from "@/actions/githubIssue";
import {OAuthButton, UserAvatar} from "@/ui/OauthButton";
import { cookies } from "next/headers";

import {IssueCoverCard} from "@/ui/IssueCoverCard";
import Link from "next/link";
import {IssueTag} from "@/ui/tagChip";
import {issueDataModelProps, IssueModel} from "@/models/IssueModel";
export default async function Home() {

    const token = cookies().get('access_token')

    var userProfile = {userName: '', avatar: ''}
    if(token !== undefined){
        userProfile = await getGithubUser()
    }

    const issueList = await getIssueList()

    return (
        <main className={"m-12"}>
            <div className={"navbarSection"}>
                <Navbar>
                    <NavbarContent>
                        <NavbarBrand>Quan 的 Blog</NavbarBrand>
                        <NavbarItem>
                            {
                                userProfile.userName.length === 0
                                    ? <OAuthButton/>
                                    : <UserAvatar avatar={userProfile.avatar} userName={userProfile.userName}/>
                            }
                        </NavbarItem>
                    </NavbarContent>
                </Navbar>
            </div>
            <div
                className={"headerSection w-full h-48 bg-blue-100 rounded-xl flex flex-col justify-center items-center gap-y-5"}>
                <p className="text-xl font-bold">Quan 的 Blog</p>
                <p className={"text-sm font-light flex flex-col justify-center items-center"}>
                    <span>Welcome to Quan 的 Blog 順便當作 Dcard 2024 實習 Intern Demo</span>
                    <span className={"text-sm font-extralight"}> power by Github Issue</span>
                </p>
            </div>
            <div className={"flex flex-col gap-y-5 py-4"}>
                {
                    issueList.map((issue) => {
                        return (
                           <Link key={issue.id} href={`/${issue.number}`}>
                               <IssueCoverCard key={issue.id} issue={issue}/>
                           </Link>
                        )
                    })
                }
            </div>
        </main>
    )
}
