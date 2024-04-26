
'use client'
// import { Button } from '@nextui-org/button'
import { Button } from "@/components/ui/button"
import Link from "next/link";
import { User } from "@nextui-org/user";
import React from "react";
import { redirect } from "next/navigation";
import {toast} from "sonner";
import {useRouter} from "next/navigation";

export function OAuthButton() {

    const client_id = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID as string
    const url = 'https://github.com/login/oauth/authorize?client_id=' + client_id
    const router = useRouter()

    return (
        <Button color="primary" onClick={
            async ()  => {
                await new Promise((resolve) => {
                    router.push(url)
                })
                // router.push(url)
                toast("登入成功", {
                    description: "開始留言或編輯你的貼文",
                })
                // router.back()
            }
        }>
            Github 登入
        </Button>
    )
}