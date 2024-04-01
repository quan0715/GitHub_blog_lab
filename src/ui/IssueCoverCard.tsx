'use client'
import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/card";
import {IssueTag, TagChip} from "@/ui/tagChip";
import React from "react";
import {User} from "@nextui-org/user";
import {Simulate} from "react-dom/test-utils";
import click = Simulate.click;
import {issueDataModelProps, IssueLabelModelProps, IssueModel} from "@/models/IssueModel";
import {Image} from "@nextui-org/image";
import NextImage from 'next/image'
import Link from "next/link";
import {Button} from "@nextui-org/button";

function CoverImage({imageURL}: {imageURL: string}) {
    return (
        <div style={{ position: 'relative', width: '100%', aspectRatio: "1.69"}}>
            <NextImage
                fill
                style={{objectFit: 'cover', objectPosition: 'center', borderRadius: '8px'}}
                src={imageURL}
                alt={"cover image"}
            />
        </div>
    )
}

export function IssueCoverCard({issue}: {issue: issueDataModelProps}) {

    const issueModel = new IssueModel(issue)

    return (
        <Card className={"overflow-hidden max-w-2xl max-h-unit-3xl"}>
            <Link href={`/${issueModel.data.number}`}>
            <CardBody>
                { issueModel.cover_image !== null ? <CoverImage imageURL={issueModel.cover_image}/> : null }
                <div className={"flex flex-col w-full flex-grow p-4 justify-start items-start"}>
                    <div>
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
                        <div className={"text-xl font-semibold"}>{issueModel.title}</div>
                        <div className={"text-xl font-light"}>{issueModel.subtitle}</div>
                    </div>
                    <div className={"flex flex-grow flex-wrap gap-1 flex-row py-4 justify-start"}>
                        {
                            issueModel.data.labels.map((label) => {
                                return <TagChip key={label.id} labelData={label}/>
                            })
                        }
                    </div>
                </div>


            </CardBody>
            </Link>

        </Card>

    )
}