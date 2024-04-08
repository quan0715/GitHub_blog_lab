
import {
    GithubUserModelProps,
    issueDataModelProps,
    IssueEntity,
    IssueLabelModelProps,
    IssueModel
} from "@/models/IssueModel"

import {
    getTokenFromCookie,
    installationAuth,
} from "@/actions/githubOauth"
import {Octokit} from "@octokit/core";

const headers = {
    'X-Github-Api-Version': '2022-11-28'
}


export type getIssueResultProps = {
    data: issueDataModelProps[],
    next: string | undefined
}
// gitHub app action

function getPagingURL(link: string): string | undefined {
    // console.log('next url', link)
    const match = link.match(/<([^>]+)>;\s*rel="next"/);

    if (match) {
        // const url = new URL(match[1]);
        return match[1]
        // console.log('url', url)
        // const nextPageParam = url.searchParams.get("page");
        // return nextPageParam ? Number(nextPageParam).toString() : undefined;
    }
    return undefined;
}
function hasPagination(linkHeader: string): boolean {
    return (linkHeader && linkHeader.includes(`rel=\"next\"`)) as boolean
}

export async function getAllIssue(paginationURL?: string | undefined): Promise<any>{
    try{
        const octokit = await installationAuth()
        const issue = paginationURL !== undefined
            ? await octokit.request('GET '+paginationURL, {headers: headers})
            : await octokit.request('GET /repos/{owner}/{repo}/issues',{
                owner: process.env.NEXT_PUBLIC_AUTHOR_GITHUB_USERNAME as string,
                repo: process.env.NEXT_PUBLIC_BLOG_REPO_NAME as string,
                // per_page: 10,
                headers: headers,
            })
        // console.log('issue', issue.data)
        const result = issue.data.map((item: any) => {
            return {...item}
        })
        console.log('result', result)
        const link = issue.headers.link as string
        return {
            // issues: JSON.parse(JSON.stringify({
            //     data: result as issueDataModelProps[],
            //     next: hasPagination(link) ? getPagingURL(link) : undefined
            // })),
            data: result as issueDataModelProps[],
            next: link// hasPagination(link) ? getPagingURL(link) : ''
        }
    } catch (e) {
        console.log('error', e)
        return {} as getIssueResultProps
    }
}


// gitHub app action
export async function getIssueById({issueId}: {issueId: number}): Promise<issueDataModelProps> {
    try{
        const octokit = await installationAuth()
        const res = await octokit.request('GET /repos/{owner}/{repo}/issues/{issue_number}', {
            owner: process.env.NEXT_PUBLIC_AUTHOR_GITHUB_USERNAME as string,
            repo: process.env.NEXT_PUBLIC_BLOG_REPO_NAME as string,
            issue_number: issueId,
            headers: headers
        })
        return {
            ...res.data,
        } as issueDataModelProps
    }
    catch (e) {
        console.log('error', e)
        return {} as issueDataModelProps
    }
}

// gitHub user oauth action
type createIssueProps = {
    token: string,
    issueEntity: IssueEntity
}
async function createIssue({token, issueEntity}: createIssueProps): Promise<issueDataModelProps> {
    try{
        // const token = await getTokenFromCookie()
        const octokit = new Octokit({auth: token})

        const res = await octokit.request('POST /repos/{owner}/{repo}/issues', {
            owner: process.env.NEXT_PUBLIC_AUTHOR_GITHUB_USERNAME as string,
            repo: process.env.NEXT_PUBLIC_BLOG_REPO_NAME as string,
            title: issueEntity.title,
            body: issueEntity.body,
            assignee: issueEntity.assignee,
            headers: headers
        })
        const newIssue = {...res.data} as issueDataModelProps
        console.log('newIssue', newIssue)
        return newIssue
    }
    catch (e) {
        console.log('error', e)
        return {} as issueDataModelProps
    }
}

export async function createNewIssue(issueEntity: IssueEntity): Promise<issueDataModelProps> {
    const token = await getTokenFromCookie()
    if(token === undefined){
        throw new Error('token is undefined')
    }
    return createIssue({
        token: token,
        issueEntity: issueEntity
    })
}


export async function deleteIssue({issueId}: {issueId: number}){

    const res = await updateIssue({issueId: issueId, issueEntity: {} as IssueEntity, open: false})

}
export async function updateIssue({issueId, issueEntity, open=true}: {issueId: number, issueEntity: IssueEntity, open: boolean}): Promise<issueDataModelProps> {
    const token = await getTokenFromCookie()
    if(token === undefined){
        throw new Error('token is undefined')
    }

    try{
        const octokit = new Octokit({auth: token})
        const res = await octokit.request('PATCH /repos/{owner}/{repo}/issues/{issue_number}', {
            owner: process.env.NEXT_PUBLIC_AUTHOR_GITHUB_USERNAME as string,
            repo: process.env.NEXT_PUBLIC_BLOG_REPO_NAME as string,
            issue_number: issueId,
            title: issueEntity.title,
            body: issueEntity.body,
            assignee: issueEntity.assignee,
            state: open ? 'open' : 'closed',
            headers: headers,
        })
        return {
            ...res.data,
        } as issueDataModelProps
    }
    catch (e) {
        console.log('error', e)
        return {} as issueDataModelProps
    }
}


// gitHub user oauth action
// delete issue by issue number
