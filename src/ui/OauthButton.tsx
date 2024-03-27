
'use client'
import { Button } from '@nextui-org/button'

import {authorize, signOut} from '@/actions/githubOauth'
import Link from "next/link";
import {Dropdown, DropdownItem, DropdownMenu, DropdownTrigger} from "@nextui-org/dropdown";
import {User} from "@nextui-org/user";
import React from "react";
// import {cookies} from "next/headers";
import {NextRequest, NextResponse} from "next/server";

export function OAuthButton() {
    // redirect to github oauth page
    return (
        <Button color="primary">
            <Link href={"https://github.com/login/oauth/authorize?client_id=ecef2862339aeb58fb5e&redirect_uri=http://localhost:3000/api/oauth/callback&scope=read:user"}>
                Github Oauth
            </Link>
        </Button>
    )
}

export function UserAvatar({avatar, userName} : {avatar: string, userName: string}) {
    return (
        <Dropdown>
            <DropdownTrigger>
                <User
                    as={"button"}
                    className={"transition-transform"}
                    avatarProps={{
                        src: avatar,
                        alt: userName
                    }}
                    description={"@blog author"}
                    name={userName}/>
            </DropdownTrigger>
            <DropdownMenu aria-label={"signout"}>
                {/*<DropdownItem as={"link"} key={"logout"} href={"/api/oauth.signOut"}>*/}
                {/*    登出*/}
                {/*</DropdownItem>*/}
                <DropdownItem key="sign out" href="/api/oauth/signOut"> 登出 </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    )
}

// function logout(){
//     console.log('logout')
//     // clear token and redirect to home
//     // cookies().set('access_token', '', {maxAge: 0})
//     NextResponse.redirect(new URL("/",));
// }