'use client'
import React, {useContext} from "react"
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import {LogOut} from "lucide-react"
import {githubSignOut} from "@/actions/githubOauth"

import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import {GithubUserModelProps} from "@/models/IssueModel"
import {GithubAvatar} from "@/components/blocks/GithubAvatar"
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import {UserContext} from "@/Providers/UserProvider"
export function AvatarDropdown() {
    const userContext = useContext(UserContext)
    const router = useRouter()

    const signOut = async () => {
        console.log('sign out')
        await githubSignOut()
        toast("登出成功", {
            description: "重新登入以編輯文章或留言",
            action: {
                label: "關閉提醒",
                onClick: () => console.log("關閉提醒"),
            },
        })
        userContext.setUserContext({
            ...userContext,
            user: null,
        })
        router.refresh()
    }

    const avatar = userContext.user as GithubUserModelProps

    return (
        <DropdownMenu >
            <DropdownMenuTrigger id={"user-avatar"}>
               <div className={"hidden md:block "}>
                   <GithubAvatar author={userContext.user}/>
               </div>
                <Avatar className={"md:hidden w-8 h-8"}>
                    <AvatarImage src={avatar.avatar_url} alt={avatar.login}/>
                    <AvatarFallback>{avatar.login}</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator></DropdownMenuSeparator>
                <DropdownMenuItem onSelect={signOut} className={"flex flex-row justify-start"}>
                    <LogOut className={"text-red-400"}/>
                    登出
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}