'use client'
import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/card";
import {IssueTag, TagChip} from "@/ui/tagChip";
import React from "react";
import {User} from "@nextui-org/user";

export type issueProps = {
    id: number,
    body: string,
    title: string,
    labels: IssueTag[],
    assignee: {
        login: string,
        avatar_url: string
    },
}

export function IssueCoverCard({issue}: {issue: issueProps}) {
    // console.log('issue', issue)
    return (
        <Card key={issue.id}>
            <CardBody>
                <div className={"flex flex-col p-4 justify-between items-start"}>
                    <div>
                        <User
                            as={"button"}
                            className={"transition-transform"}
                            avatarProps={{
                                size: 'sm',
                                src: issue.assignee.avatar_url,
                                alt: issue.assignee.login
                            }}
                            // description={"@blog author"}
                            name={issue.assignee.login}/>
                        <div className={"text-xl font-semibold"}>{issue.title}</div>
                    </div>
                    <div className={"h-8"}></div>
                    <div className={"flex flex-row"}>
                        {
                            issue.labels.map((label) => {
                                return <TagChip key={label.id} labelData={label}/>
                            })
                        }
                    </div>
                </div>
            </CardBody>
        </Card>
    )
}