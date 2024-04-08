import {IssueTag} from "@/components/blocks/TagChip";
import {metadata} from "@/app/layout";

export type IssueEntity = {
    title: string,
    body: string,
    assignee: string
}

export type issueDataModelProps = {
    id: number,
    number: number,
    node_id: string,
    body: string,
    title: string,
    labels: IssueLabelModelProps[],
    user: GithubUserModelProps,
    assignee: GithubUserModelProps | null,
    assignees: GithubUserModelProps[],
    state: 'open' | 'closed' | 'draft',
    locked: boolean,
    comments: number,
    created_at: string,
    updated_at: string,
    closed_at: string | null,
}

export type GithubUserModelProps = {
    login: string,
    avatar_url: string
}

export type IssueLabelModelProps = {
    id: number,
    node_id: string,
    name: string,
    color: string,
    description: string,
    default: boolean
}

export class IssueModel{
    data: issueDataModelProps
    static parseMetaDate(body: string | null){
        if (body === null || !body){
            return {
                title: null,
                subtitle: null,
                cover_image: null,
                body: ''
            }
        }
        const data = body.split('-----', 2)

        if (data.length < 2){
            // no metadata
            return {
                title: null,
                subtitle: null,
                cover_image: null,
                body: body.trim()
            }
        }
        // console.log('data', data)
        const metaData = data[0]
            .trim()
            .split('\n')
            .map((line) => {
                const [key, value] = line.split('::')
                if(key.trim().endsWith('image')){
                    const regex = /!\[.*?]\((.*?)\s*("(?:.*[^"])")?\s*\)/g;
                    const match = regex.exec(value.trim())
                    return {
                        [key.trim()]: match ? match[1] : value.trim()
                    }
                }
                return {
                    [ key.trim() ]: value.trim()
                }
            }).reduce((acc, line) => {
                return {
                    ...acc,
                    ...line
                }
            })
        // console.log('metadata', metaData)

        return {
            title: metaData['title'] || null,
            subtitle: metaData['sub_title'] || null,
            cover_image: metaData['cover_image'] || null,
            body: data[1].trim()
        }

    }

    metadata: {
        title: string | null,
        subtitle: string | null,
        cover_image: string | null,
        body: string,
    }
    constructor(issueData: issueDataModelProps){
        this.metadata = IssueModel.parseMetaDate(issueData.body)
        this.data = issueData
        // console.log('metadata', this.metadata)
    }

    get title(){
        return this.metadata.title ?? this.data.title
    }
    get subtitle(){
        return this.metadata.subtitle ?? ''
    }

    get cover_image(){
        return this.metadata.cover_image
    }

}