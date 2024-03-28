
import React from 'react'
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/navbar"
import Markdown from 'react-markdown'
// import { Button, ButtonGroup } from "@nextui-org/button"
import {getGithubUser, getIssueList} from "@/actions/githubOauth";
import {OAuthButton, UserAvatar} from "@/ui/OauthButton";
import { cookies } from "next/headers";
import { User } from "@nextui-org/user";

import {IssueCoverCard, issueProps} from "@/ui/IssueCoverCard";
import {is} from "unist-util-is";
import {IssueTag} from "@/ui/tagChip";
export default async function Home() {
    const token = cookies().get('access_token')
    var userProfile = {
        userName: '',
        avatar: ''
    }
    if(token !== undefined){
        // get user info
        userProfile = await getGithubUser()
        // console.log('userProfile', userProfile)
    }

    const issue = await getIssueList()
    // console.log('issue', issue)
    return (
        <main className={"m-12"}>
            <div className={"navbarSection"}>
                <Navbar>
                    <NavbarContent>
                        <NavbarBrand>Quan 的 Blog</NavbarBrand>
                        {/*<NavbarItem>Home</NavbarItem>*/}
                        {/*<NavbarItem>About</NavbarItem>*/}
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
                    issue.map((issue) => {
                        const issueData = {
                            issue: issue,
                            id: issue.id,
                            body: issue.body,
                            title: issue.title,
                            assignee: {
                                login: issue.assignee?.login ?? 'No assignee',
                                avatar_url: issue.assignee?.avatar_url ?? ''
                            },
                            labels: issue.labels.map((label) => {
                                return label as IssueTag
                            }) as IssueTag[]
                        } as issueProps
                        return (
                            <IssueCoverCard key={issue.id} issue={issueData}/>
                        )
                    })
                }
            </div>
        </main>
    )
}
