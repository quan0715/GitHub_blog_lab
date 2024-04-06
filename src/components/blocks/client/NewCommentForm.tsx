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
                    <Tabs defaultValue="Write" className="w-full" >
                        <TabsList>
                            <TabsTrigger value="Write">撰寫</TabsTrigger>
                            <TabsTrigger value="Preview">預覽</TabsTrigger>
                        </TabsList>
                        <TabsContent value="Write">
                            <Textarea placeholder={"留言內容"} onChange={onInputChange} value={body}/>
                        </TabsContent>
                        <TabsContent value="Preview">
                            <MarkdownDisplay source={body}/>
                        </TabsContent>
                    </Tabs>
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
