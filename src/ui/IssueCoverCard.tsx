'use client'
// import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/card";
import {IssueTag, TagChip} from "@/ui/tagChip";
import React from "react";
import {GithubUserModelProps, issueDataModelProps, IssueLabelModelProps, IssueModel} from "@/models/IssueModel";
import NextImage from 'next/image'
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

function CoverImage({imageURL = null}: {imageURL: string | null}) {
        // return next image component if imageURL is not undefined
        // else return color block
        return (<div style={{ position: 'relative', width: '100%', aspectRatio: "1.69"}}>
            {
                <NextImage
                    fill
                    style={{objectFit: 'cover', objectPosition: 'center', borderRadius: '8px'}}
                    src={imageURL !== null ? imageURL : '/default_cover.JPG'}
                    alt={"cover image"}
                />
            }
        </div>
    )
}

function AuthorAvatar({author = null}: {author: GithubUserModelProps | null}) {
    console.log('author', author)
    return (
       author !== null ?
            <div className={"flex flex-row items-center"}>
                <Avatar className={"w-8 h-8"}>
                    <AvatarImage src={author.avatar_url} alt={author.login}/>
                    <AvatarFallback>{author.login}</AvatarFallback>
                </Avatar>
                <div className={"px-2"}>
                    <p>{author.login}</p>
                </div>
            </div>
            : null
    )
}

function LabelsWrapper({labels}: {labels: IssueLabelModelProps[]}){
    return (
        <div className={"flex flex-grow flex-wrap gap-1 flex-row py-4 justify-start"}>
            {
                labels.map((label) => {
                    return <TagChip key={label.id} labelData={label}/>
                })
            }
        </div>
    )
}

export function IssueCoverCard({issue}: {issue: issueDataModelProps}) {
    const issueModel = new IssueModel(issue)
    return (
        <Card className={"overflow-hidden max-w-2xl max-h-unit-3xl"}>
            <Link href={`/${issueModel.data.number}`}>
                <CardHeader>
                    <CoverImage imageURL={issueModel.cover_image}/>
                </CardHeader>
                <CardContent className={"flex flex-col w-full flex-grow justify-start items-start gap-y-2"}>
                    <AuthorAvatar author={issueModel.data.assignee}/>
                    <section>
                        <div className={"text-2xl font-semibold"}>{issueModel.title}</div>
                        <div className={"text-xl font-light"}>{issueModel.subtitle}</div>
                    </section>
                    <LabelsWrapper labels={issueModel.data.labels}/>
                </CardContent>
            </Link>
        </Card>

    )
}

export function BlogPostHeader({issueData}: { issueData: issueDataModelProps }) {
    const issueModel = new IssueModel(issueData)
    return (
        <div className={"w-full flex flex-col items-center"}>
            <CoverImage imageURL={issueModel.cover_image}/>
            <div className={"w-full flex flex-col py-5"}>
                <AuthorAvatar author={issueModel.data.assignee}/>
                <section>
                    <div className={"text-3xl font-semibold"}>{issueModel.title}</div>
                    <div className={"text-2xl font-light"}>{issueModel.subtitle}</div>
                </section>
                <LabelsWrapper labels={issueModel.data.labels}/>
            </div>
        </div>
    )
}