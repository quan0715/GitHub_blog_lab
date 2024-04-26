'use client';
import {Logo, ThemeSwitcherButton} from "@/components/blocks/client/ThemeToggleUI";
import {OAuthButton} from "@/components/blocks/client/OauthButton";
import React, {useContext} from "react";
import Link from "next/link";
import {AvatarDropdown} from "@/components/blocks/client/AvatarDropdown";
import {UserContext} from "@/Providers/UserProvider"


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

export function NavBar() {

    let userContext = useContext(UserContext)

    return (
        <div className={"w-full flex flex-row justify-between py-4"}>
            <LogoButton/>
            <div className={"flex flex-row justify-end space-x-2"}>
                <ThemeSwitcherButton/>
                {
                    userContext.user === null
                        ? <OAuthButton/>
                        : <AvatarDropdown />
                }
            </div>
        </div>
    );
}

