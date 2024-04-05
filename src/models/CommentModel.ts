import {GithubUserModelProps} from "@/models/IssueModel";

export type CommentDataModelProps = {
    id: number,
    node_id: string,
    user: GithubUserModelProps,
    created_at: string,
    updated_at: string,
    author_association: string,
    body: string,
}

