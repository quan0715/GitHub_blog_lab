'use client'
import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/card";
import {IssueTag, TagChip} from "@/ui/tagChip";
import React from "react";
import {User} from "@nextui-org/user";
import {Simulate} from "react-dom/test-utils";
import click = Simulate.click;
import {issueDataModelProps, IssueModel} from "@/models/IssueModel";
import {Image} from "@nextui-org/image";
// import Image from 'next/image'
export function IssueCoverCard({issue}: {issue: issueDataModelProps}) {

    const issueModel = new IssueModel(issue)

    return (
        <Card className={"overflow-scroll"}>
            <CardBody className={"flex-row justify-start items-center"}>
                {
                    issueModel.cover_image !== null ?
                        <div
                            className={"sm:hidden"}
                            style={
                                {
                                    position: 'relative',
                                    maxWidth: '200px',
                                }
                            }>
                            <Image
                                className={"rounded-xl "}
                                src={issueModel.cover_image}
                                alt={"cover image"}
                                // fill={true}
                                style={
                                    {
                                        objectFit: 'cover'
                                    }
                                }
                                sizes={"200px 200px"}
                            />
                        </div>
                        : null
                }
                <div className={"flex flex-col p-4 justify-between items-start"}>
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
                    <div className={"h-8"}></div>
                    <div className={"flex flex-row"}>
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