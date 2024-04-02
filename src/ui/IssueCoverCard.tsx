'use client'
import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/card";
import {IssueTag, TagChip} from "@/ui/tagChip";
import React from "react";
import {User} from "@nextui-org/user";
import {GithubUserModelProps, issueDataModelProps, IssueLabelModelProps, IssueModel} from "@/models/IssueModel";
import NextImage from 'next/image'
import Link from "next/link";

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
    return (
       author !== null ?
              <User
                avatarProps={{
                     size: 'sm',
                     src: author.avatar_url,
                     alt: author.login
                }}
                name={author.login}/>
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
            <CardBody>
                <CoverImage imageURL={issueModel.cover_image}/>
                <div className={"flex flex-col w-full flex-grow p-4 justify-start items-start"}>
                    <div>
                        <AuthorAvatar author={null}/>
                        <div className={"text-2xl font-semibold"}>{issueModel.title}</div>
                        <div className={"text-xl font-light"}>{issueModel.subtitle}</div>
                    </div>
                    <LabelsWrapper labels={issueModel.data.labels}/>
                </div>
            </CardBody>
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
                <AuthorAvatar author={null}/>
                <div className={"text-3xl font-semibold"}>{issueModel.title}</div>
                <div className={"text-2xl font-light"}>{issueModel.subtitle}</div>
                <LabelsWrapper labels={issueModel.data.labels}/>
            </div>
        </div>
    )
}