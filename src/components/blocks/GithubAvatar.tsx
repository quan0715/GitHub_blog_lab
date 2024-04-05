import {GithubUserModelProps} from "@/models/IssueModel";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import React from "react";

export function GithubAvatar({author = null}: {author: GithubUserModelProps | null}) {
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