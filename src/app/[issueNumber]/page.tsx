import {getIssueById} from "@/actions/githubIssue";
import {getAllIssueComments} from "@/actions/githubComments";
import {BlogPostHeader, IssueCoverCard} from "@/components/blocks/IssueCoverCard";
import {issueDataModelProps, IssueModel} from "@/models/IssueModel";
import { MDXRemote } from 'next-mdx-remote/rsc'
import React from "react";
import rehypeHighlight from "rehype-highlight";
import {CommentDisplayCard} from "@/components/blocks/CommentDisplayCard";


export default async function PostPage({params}: { params: { issueNumber: string } }) {

    const issue = await getIssueById({issueId: parseInt(params.issueNumber)})
    const comments = await getAllIssueComments({issueId: parseInt(params.issueNumber)})
    const issueModel = new IssueModel(issue)

    return (
        <div>
            <BlogPostHeader issueData={issue}></BlogPostHeader>
            <article className="max-w-none w-full prose prose-base prose-slate dark:prose-invert py-8">
                <MDXRemote
                    source={issueModel.metadata.body} options={{
                    // mdxOptions: {
                    //     remarkPlugins: [],
                    //     // @ts-ignore
                    //     rehypePlugins: [rehypeHighlight],
                    // }
                }}/>
            </article>
            <article className={"w-full space-y-4"}>
                <p className={"text-lg font-semibold"}>留言區</p>
                <p className={"text-sm"}> {comments.length > 0 ? "" : "此貼文還沒有留言，趕快登入後留言吧！！！"} </p>
                {
                    comments.map((data) => {
                        return (
                            <CommentDisplayCard key={data.id} commentData={data}/>
                        )
                    })
                }
            </article>
        </div>
    )
}