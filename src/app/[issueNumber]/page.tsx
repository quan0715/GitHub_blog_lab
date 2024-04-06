import {getIssueById} from "@/actions/githubIssue";
import {getAllIssueComments} from "@/actions/githubComments";
import {BlogPostHeader, IssueCoverCard} from "@/components/blocks/IssueCoverCard";
import {GithubUserModelProps, issueDataModelProps, IssueModel} from "@/models/IssueModel";
import { MDXRemote } from 'next-mdx-remote/rsc'
import React from "react";
import rehypeHighlight from "rehype-highlight";
import {CommentDisplayCard} from "@/components/blocks/CommentDisplayCard";
import {cookies} from "next/headers";
import {getGithubUser} from "@/actions/githubOauth";
import {NewCommentForm} from "@/components/blocks/client/NewCommentForm";


export default async function PostPage({params}: { params: { issueNumber: string } }) {

    const issue = await getIssueById({issueId: parseInt(params.issueNumber)})
    const comments = await getAllIssueComments({issueId: parseInt(params.issueNumber)})
    const sortedList = comments.sort((a, b) => {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    })

    const issueModel = new IssueModel(issue)

    let user: GithubUserModelProps| null = null
    try{
        user = await getGithubUser()
        // console.log('user', user)
    } catch (e) {
        console.error(e)
    }

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
            <article className={"w-full space-y-4 py-4"}>
                <p className={"text-lg font-semibold"}>留言區</p>
                <p className={"text-sm"}> {comments.length > 0 ? "" : "此貼文還沒有留言，趕快登入後留言吧！！！"} </p>
                <NewCommentForm author={user} issueId={issue.number}/>
                {
                    sortedList.map((data) => {
                        return (
                            <CommentDisplayCard key={data.id} commentData={data}/>
                        )
                    })
                }
            </article>
        </div>
    )
}
