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
import {signOut} from "@/actions/githubOauth";

export function AvatarDropdown({avatar}: {avatar: React.ReactNode}) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                {avatar}
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator></DropdownMenuSeparator>
                <DropdownMenuItem onSelect={() =>{
                    console.log('sign out')
                    signOut()
                }} className={"flex flex-row justify-start"}>
                    <LogOut className={"text-red-400"}/>
                    登出
                    {/*<AlertDialogDemo></AlertDialogDemo>*/}
                    {/*<Link  className={"px-2"} href={'/api/oauth/signOut'}></Link>*/}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}