'use client'
import React from "react";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {LogOut} from "lucide-react";
import {githubSignOut} from "@/actions/githubOauth";

import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import {GithubUserModelProps} from "@/models/IssueModel";
import {GithubAvatar} from "@/components/blocks/GithubAvatar";

export function AvatarDropdown({avatar}: {avatar: GithubUserModelProps}) {
    const router = useRouter()
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <GithubAvatar author={avatar}/>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator></DropdownMenuSeparator>
                <DropdownMenuItem onSelect={ async () =>{
                    console.log('sign out')
                    await githubSignOut()
                    toast("登出成功", {
                        description: "重新登入以編輯文章或留言",
                        action: {
                            label: "關閉提醒",
                            onClick: () => console.log("關閉提醒"),
                        },
                    })
                    router.push('/')
                }} className={"flex flex-row justify-start"}>
                    <LogOut className={"text-red-400"}/>
                    登出
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}