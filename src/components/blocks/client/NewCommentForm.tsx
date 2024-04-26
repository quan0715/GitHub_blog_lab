'use client'
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {GithubAvatar} from "@/components/blocks/GithubAvatar";
import React from "react";
import {GithubUserModelProps} from "@/models/IssueModel";
import {OAuthButton} from "@/components/blocks/client/OauthButton";
import {Button} from "@/components/ui/button";
import {postNewComment} from "@/actions/githubComments"
import {useRouter} from "next/navigation"
import {toast} from "sonner"
import {MarkdownEditForm} from "@/components/blocks/client/MarkdownEditForm"
import {useContext} from "react"
import {UserContext} from "@/Providers/UserProvider"
type CommentDisplayCardProps = {
    issueId: number,
    // author: GithubUserModelProps | null,

}

export function NewCommentForm({issueId}: CommentDisplayCardProps) {

    const [body, setBody] = React.useState('')
    const route = useRouter()
    const userContext = useContext(UserContext)

    const onInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setBody(e.target.value)
    }

    return (
        userContext.user !== null
            ? <Card className={"w-full"}>
                <CardHeader>
                    <GithubAvatar author={userContext.user}/>
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
