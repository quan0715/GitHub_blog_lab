
import React from 'react'
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/navbar"
// import { Button, ButtonGroup } from "@nextui-org/button"
import { authorize, getGithubUser } from "@/actions/githubOauth";
import {OAuthButton, UserAvatar} from "@/ui/OauthButton";
import { cookies } from "next/headers";
import { User } from "@nextui-org/user";
import {  Dropdown,  DropdownTrigger,  DropdownMenu,  DropdownSection,  DropdownItem} from "@nextui-org/dropdown";
export default async function Home() {
    const token = cookies().get('access_token')
    var userProfile = {
        userName: '',
        avatar: ''
    }
    if(token !== undefined){
        // get user info
        userProfile = await getGithubUser()
        console.log('userProfile', userProfile)
    }
    return (
        <main className={"m-12"}>
            <div className={"navbarSection"}>
                <Navbar>
                    <NavbarContent>
                        <NavbarBrand>Quan's Blog</NavbarBrand>
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
                <p className="text-xl font-bold">Quan's Blog</p>
                <p className={"text-sm font-light flex flex-col justify-center items-center"}>
                    <span>Welcome to Quan's Blog 順便當作 Dcard 2024 實習 Intern Demo</span>
                    <span className={"text-sm font-extralight"}> power by Github Issue</span>
                </p>
            </div>
            <h1>{ token === undefined ? "LOGIN FIRST" : token.value}</h1>

        </main>
    )
}
