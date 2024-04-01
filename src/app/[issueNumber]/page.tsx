import {getIssueById, renderMarkdown} from "@/actions/githubIssue";
import Markdown from "react-markdown";
import {IssueCoverCard} from "@/ui/IssueCoverCard";
import {is} from "unist-util-is";
import {issueDataModelProps, IssueModel} from "@/models/IssueModel";
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote/rsc'
import NextImage from 'next/image'
import {User} from "@nextui-org/user";
import React from "react";
import {TagChip} from "@/ui/tagChip";
import {Divider} from "@nextui-org/divider";




export default async function PostPage({params} : {params: {issueNumber: string}}){
    const issue = await getIssueById({issueId: parseInt(params.issueNumber)})
    const issueModel = new IssueModel(issue)
    const mdxSource = await serialize(issueModel.metadata.body)
    // console.log('mdxSource', mdxSource)
    const content = await renderMarkdown({markdown: issueModel.metadata.body})
    // console.log('content', content)

    return (
        <div className={"w-screen h-full"}>
            <div className={"w-full h-fit flex flex-col justify-start items-center"}>
                <BlogPostHeader issueData={issue}></BlogPostHeader>
                {/*<Divider></Divider>*/}
                <div className={"max-w-[900px] min-w-[430px]"}>
                    {/*<h1 className={"text-3xl"}>{issueModel.metadata.title}</h1>*/}
                    {/*<Markdown>{issueModel.metadata.body}</Markdown>*/}
                    <article className="prose prose-slate max-w-[900px] min-w-[430px] w-full ">
                        {/*<MDXRemote source={issueModel.metadata.body}/>*/}
                        <div className={""} dangerouslySetInnerHTML={{__html: content}}/>

                    </article>
                </div>
            </div>
        </div>
    )
}

function BlogPostHeader({issueData}: { issueData: issueDataModelProps }) {
    const issueModel = new IssueModel(issueData)
    return (
        <div className={"p-4 w-[90%] flex flex-col items-center"}>
            {
                issueModel.cover_image !== null ?
                    <div style={{
                        position: 'relative',
                        width: '100%',
                        aspectRatio: '1.8',
                        maxWidth: "900px",
                        minWidth: "430px"
                    }}>
                        <NextImage
                            layout={"fill"}
                            style={{objectFit: 'cover', objectPosition: 'center', borderRadius: '16px'}}
                            src={issueModel.cover_image}
                            alt={"cover image"}
                        />
                    </div>
                    : null
            }
            <div className={"w-full flex flex-col max-w-[900px] min-w-[430px] py-5"}>
                <div className={"flex flex-row gap-y-5"}>
                    {
                        issueModel.data.assignee !== null ?
                            <User
                                avatarProps={{
                                    size: 'sm',
                                    src: issueModel.data.assignee.avatar_url,
                                    alt: issueModel.data.assignee.login
                                }}
                                name={issueModel.data.assignee.login}/>
                            : null
                    }
                </div>
                <div className={"text-3xl font-semibold"}>{issueModel.title}</div>
                <div className={"text-2xl font-light"}>{issueModel.subtitle}</div>
                <div className={"flex flex-grow flex-wrap gap-1 flex-row py-4 justify-start"}>
                    {
                        issueModel.data.labels.map((label) => {
                            return <TagChip key={label.id} labelData={label}/>
                        })
                    }
                </div>
            </div>
        </div>
    )
}