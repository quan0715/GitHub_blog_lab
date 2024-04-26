import React from 'react';
import {CommentDataModelProps} from "@/models/CommentModel";
import {
    Card,
    CardHeader,
    CardDescription,
    CardContent
} from '@/components/ui/card'
import {MDXRemote} from "next-mdx-remote/rsc";
import {GithubAvatar} from "@/components/blocks/GithubAvatar";

type CommentDisplayCardProps = {
    commentData: CommentDataModelProps
}

export function CommentDisplayCard({commentData}: CommentDisplayCardProps) {
    return (
        <Card className={"w-full"}>
            <CardHeader>
                <GithubAvatar author={commentData.user}></GithubAvatar>
                <CardDescription>{commentData.created_at}</CardDescription>
            </CardHeader>
            <CardContent>
                <article className="max-w-none w-full prose prose-base prose-slate dark:prose-invert">
                    <MDXRemote source={commentData.body} />
                </article>
            </CardContent>
        </Card>
    );
}