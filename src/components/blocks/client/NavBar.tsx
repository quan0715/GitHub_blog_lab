
import {Logo, ThemeSwitcherButton} from "@/components/blocks/client/ThemeToggleUI";
import {OAuthButton} from "@/components/blocks/client/OauthButton";
import React from "react";
import {cookies} from "next/headers";
import {getGithubUser} from "@/actions/githubOauth";
import Link from "next/link";
import {GithubAvatar} from "@/components/blocks/GithubAvatar";

import {LogOut} from "lucide-react";
import {Button} from "@/components/ui/button";
import {redirect} from "next/navigation";
import {AvatarDropdown} from "@/components/blocks/client/AvatarDropdown";
import {GithubUserModelProps} from "@/models/IssueModel";

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

    let user: GithubUserModelProps = {
        login: "",
        avatar_url: "",
    }
    try{
        user = await getGithubUser()
    } catch (e) {
        console.error(e)
    }

    return (
        <div className={"w-full flex flex-row justify-between py-4"}>
            <LogoButton/>
            <div className={"flex flex-row justify-end space-x-2"}>
                <ThemeSwitcherButton/>
                {
                    user.login.length === 0
                        ? <OAuthButton/>
                        : <AvatarDropdown avatar={user}/>
                }
            </div>
        </div>
    );
}

