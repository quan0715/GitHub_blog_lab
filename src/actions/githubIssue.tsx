
import {issueDataModelProps, IssueEntity, IssueModel} from "@/models/IssueModel"

import {
    getTokenFromCookie,
    installationAuth,
} from "@/actions/githubOauth"
import {Octokit} from "@octokit/core";


const headers = {
    'X-Github-Api-Version': '2022-11-28'
}


// gitHub app action
export async function getAllIssue() {
    try{
        const octokit = await installationAuth()
        const issue = await octokit.request('GET /repos/{owner}/{repo}/issues',{
            owner: process.env.NEXT_PUBLIC_AUTHOR_GITHUB_USERNAME as string,
            repo: process.env.NEXT_PUBLIC_BLOG_REPO_NAME as string,
            headers: headers
        })
        return issue.data.map((item: any) => {
            return { ...item } as issueDataModelProps
        })
    } catch (e) {
        console.log('error', e)
        return []
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

        // const appAuth = await installationAuth()
        //
        // const assign = await appAuth.request('PATCH /repos/{owner}/{repo}/issues/{issue_number}', {
        //     owner: process.env.NEXT_PUBLIC_AUTHOR_GITHUB_USERNAME as string,
        //     repo: process.env.NEXT_PUBLIC_BLOG_REPO_NAME as string,
        //     issue_number: newIssue.number,
        //     assignee: issueEntity.assignee,
        //     headers: headers
        // })
        // console.log('assign', assign.data)
        //
        // return {...assign.data} as issueDataModelProps
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
