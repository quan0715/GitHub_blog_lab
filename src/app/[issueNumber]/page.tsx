import {getIssueById, renderMarkdown} from "@/actions/githubIssue";
import {BlogPostHeader, IssueCoverCard} from "@/ui/IssueCoverCard";
import {issueDataModelProps, IssueModel} from "@/models/IssueModel";
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote/rsc'
import React from "react";
import {Divider} from "@nextui-org/divider"
import rehypeHighlight from "rehype-highlight";
import hljs from 'highlight.js';
import Image from "next/image";
import Link from "next/link";
function PostBody({children}: {children: React.ReactNode[]}){
    return (
        <div className={"w-screen h-full flex flex-col items-center"}>
            <div className={"w-[95%] max-w-5xl p-4 flex flex-col justify-start items-center"}>
                {...children}
            </div>
        </div>
    )
}


export default async function PostPage({params}: { params: { issueNumber: string } }) {
    const issue = await getIssueById({issueId: parseInt(params.issueNumber)})
    const issueModel = new IssueModel(issue)
    // const mdxSource = await serialize(issueModel.metadata.body,)
    // const content = await renderMarkdown({markdown: issueModel.metadata.body})

    return (
        <PostBody>
            <BlogPostHeader issueData={issue}></BlogPostHeader>
            {/*<Divider></Divider>*/}
            <article className="max-w-none w-full prose prose-base prose-slate dark:prose-invert">
                <MDXRemote
                    source={issueModel.metadata.body} options={{
                    mdxOptions: {
                        remarkPlugins: [],
                        // @ts-ignore
                        rehypePlugins: [rehypeHighlight],
                    }
                }} components={{
                    // h1: ({children}) => <h1 className={"font-semibold text-primary"}>{children}</h1>,
                    // h2: ({children}) => <h2 className={"font-semibold text-primary"}>{children}</h2>,
                    // h3: ({children}) => <h3 className={"font-semibold text-primary"}>{children}</h3>,
                    // p: ({children}) => <p className={"text-lg"}>{children}</p>,
                    // a: ({children, href}) => <Link href={href??""} className={"text-blue-500"}>{children}</Link>,
                    // img: ({src, alt}) => <Image src={src} alt={alt} style={{maxWidth: "100%"}}/>
                }}/>
            </article>
        </PostBody>
    )
}