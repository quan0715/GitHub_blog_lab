
'use client'
// import { Button } from '@nextui-org/button'
import { Button } from "@/components/ui/button"
import Link from "next/link";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/dropdown";
import { User } from "@nextui-org/user";
import React from "react";

export function OAuthButton() {
    // redirect to github oauth page
    const client_id = process.env.GITHUB_CLIENT_ID as string
    const secret = process.env.GITHUB_CLIENT_SECRET
    const redirect_uri = process.env.GITHUB_REDIRECT_URI
    // console.log('client_id', client_id)
    // console.log('secret', secret)
    const url = 'https://github.com/login/oauth/authorize?client_id=Iv1.462e3b2f1c7c326f'

    return (
        <Button color="primary">
            <Link href={url}>Github 登入</Link>
        </Button>
    )
}

// export function

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