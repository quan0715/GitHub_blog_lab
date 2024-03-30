'use client'
import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/card";
import {IssueTag, TagChip} from "@/ui/tagChip";
import React from "react";
import {User} from "@nextui-org/user";
import {Simulate} from "react-dom/test-utils";
import click = Simulate.click;
import {issueDataModelProps, IssueModel} from "@/models/IssueModel";
import {Image} from "@nextui-org/image";
import NextImage from 'next/image'
export function IssueCoverCard({issue}: {issue: issueDataModelProps}) {

    const issueModel = new IssueModel(issue)

    return (
        <Card className={"overflow-hidden"}>
            <CardBody>
                {
                    issueModel.cover_image !== null ?
                        <div className={"lg:block h-[200px] max-h-[200px] p-4"}>
                            <Image
                                isBlurred
                                isZoomed
                                as={NextImage}
                                className={"grow rounded-xl w-full h-[200px] object-cover"}
                                src={issueModel.cover_image}
                                alt={"cover image"}
                                width={800}
                                height={200}
                            />
                        </div>
                        : null
                }
                <div className={"flex flex-col w-full flex-grow p-4 justify-start items-start"}>
                    <div>
                        {
                            issueModel.data.assignee !== null ?
                                <User
                                    as={"button"}
                                    className={"transition-transform"}
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
                    {/*<div className={"h-8"}></div>*/}
                    <div className={"flex flex-grow flex-row py-4 justify-start"}>
                        {
                            issueModel.data.labels.map((label) => {
                                return <TagChip key={label.id} labelData={label}/>
                            })
                        }
                    </div>
                </div>

            </CardBody>
        </Card>
    )
}