
'use client'
// import { Button } from '@nextui-org/button'
import { Button } from "@/components/ui/button"
import Link from "next/link";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/dropdown";
import { User } from "@nextui-org/user";
import React from "react";
import { redirect } from "next/navigation";
import {toast} from "sonner";
import {useRouter} from "next/navigation";

export function OAuthButton() {

    const client_id = process.env.GITHUB_CLIENT_ID as string
    const secret = process.env.GITHUB_CLIENT_SECRET
    const redirect_uri = process.env.GITHUB_REDIRECT_URI
    const url = 'https://github.com/login/oauth/authorize?client_id=Iv1.462e3b2f1c7c326f'
    const router = useRouter()

    return (
        <Button color="primary" onClick={
            () => {
                router.push(url)
                toast("登入成功", {
                    description: "開始留言或編輯你的貼文",
                })
            }
        }>
            Github 登入
        </Button>
    )
}