
import {Logo, ThemeSwitcherButton} from "@/components/blocks/ThemeToggleUI";
import {OAuthButton, UserAvatar} from "@/components/blocks/OauthButton";
import React from "react";
import {cookies} from "next/headers";
import {getGithubUser} from "@/actions/githubOauth";
import Link from "next/link";
import {GithubAvatar} from "@/components/blocks/GithubAvatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {LogOut} from "lucide-react";
import {Button} from "@/components/ui/button";
import {redirect} from "next/navigation";
import {AvatarDropdown} from "@/components/blocks/AvatarDropdown";

function LogoButton() {
    // redirect to home page
    const homePage = '/'
    return (
        <section>
            <Link href={'/'}>
                <Logo/>
            </Link>
        </section>
    );
}

export async function NavBar() {

    const token = cookies().get('access_token')

    let userProfile = {userName: '', avatar: ''};

    if(token !== undefined){
        userProfile = await getGithubUser()
    }
    const avatar = <GithubAvatar author={{
        login: userProfile.userName,
        avatar_url: userProfile.avatar
    }}/>
    return (
        <div className={"w-full flex flex-row justify-between py-4"}>
            <LogoButton/>
            <div className={"flex flex-row justify-end space-x-2"}>
                <ThemeSwitcherButton/>
                {
                    userProfile.userName.length === 0
                        ? <OAuthButton/>
                        : <AvatarDropdown avatar={avatar}/>
                }
            </div>
        </div>
    );
}

