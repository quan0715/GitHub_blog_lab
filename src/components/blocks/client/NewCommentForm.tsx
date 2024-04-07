'use client'

import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {GithubAvatar} from "@/components/blocks/GithubAvatar";
import {MDXRemote} from "next-mdx-remote/rsc";
import React from "react";
import {GithubUserModelProps} from "@/models/IssueModel";
import {OAuthButton} from "@/components/blocks/client/OauthButton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import {Button} from "@/components/ui/button";
import {serialize} from "next-mdx-remote/serialize";
import {MarkdownDisplay} from "@/components/blocks/MarkdownDisplay";
import {postNewComment} from "@/actions/githubComments";
import {revalidatePath} from "next/cache";
import {useRouter} from "next/navigation";
import {toast} from "sonner";
import {MarkdownEditForm} from "@/components/blocks/client/MarkdownEditForm";

type CommentDisplayCardProps = {
    issueId: number,
    author: GithubUserModelProps | null,

}

export function NewCommentForm({issueId, author}: CommentDisplayCardProps) {

    const [body, setBody] = React.useState('')
    const route = useRouter()

    const onInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setBody(e.target.value)
    }

    return (
        author !== null
            ? <Card className={"w-full"}>
                <CardHeader>
                    <GithubAvatar author={author}/>
                </CardHeader>
                <CardContent>
                    <MarkdownEditForm body={body} onInputChange={onInputChange}/>
                </CardContent>
                <CardFooter>
                    <Button onClick={
                        async () => {
                            await postNewComment(
                                {
                                    issueId: issueId,
                                    body: body,
                                }
                            )
                            toast.success('留言成功')
                            setBody('')
                            route.refresh()
                        }
                    }>留言</Button>
                </CardFooter>
            </Card>
            : <Card>
                <CardHeader>
                    <CardTitle>請先登入後留言</CardTitle>
                </CardHeader>
                <CardContent>
                    <OAuthButton/>
                </CardContent>
            </Card>
    );
}
