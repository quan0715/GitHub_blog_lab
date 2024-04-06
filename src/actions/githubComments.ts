import {
    getTokenFromCookie,
    githubActionWrapper,
    installationAuth,
} from "@/actions/githubOauth";

import {CommentDataModelProps} from '@/models/CommentModel'
import {issueDataModelProps} from "@/models/IssueModel";
import {Octokit} from "@octokit/core";

const headers = {
    'X-Github-Api-Version': '2022-11-28'
}
export async function getAllIssueComments({issueId}: {issueId: number}): Promise<CommentDataModelProps[]> {
    try{
        const octokit = await installationAuth()
        const issue = await octokit.request('GET /repos/{owner}/{repo}/issues/{issue_number}/comments',{
            owner: process.env.NEXT_PUBLIC_AUTHOR_GITHUB_USERNAME as string,
            repo: process.env.NEXT_PUBLIC_BLOG_REPO_NAME as string,
            issue_number: issueId,
            headers: headers
        })
        // console.log('comments', issue.data)
        return issue.data.map((item: any) => {
            return { ...item } as CommentDataModelProps
        })
    } catch (e) {
        console.log('error', e)
        return []
    }
}

type CreateIssueCommentProps = {
    userToken: string,
    issueId: number,
    body: string
}

type CreateNewCommentProps = {
    issueId: number,
    body: string
}

export async function postNewComment({issueId, body}: CreateNewCommentProps): Promise<CommentDataModelProps> {
    // const fun = createIssueComment.bind({issueId, body})
    const token = await getTokenFromCookie()

    if(token === undefined){
        throw new Error('token is undefined')
    }
    // console.log('token', token)
    const res = await createIssueComment({
        userToken : token,
        issueId: issueId,
        body: body
    })

    return {
        ...res
    } as CommentDataModelProps
}

async function createIssueComment({userToken, issueId, body}: CreateIssueCommentProps): Promise<CommentDataModelProps> {

    console.log('create comment', userToken, issueId, body)

    const octokit = new Octokit({auth: userToken})

    // const owner = 'quan0715'
    // const repo = 'GithubBlogPortal'
    // const uri = `POST /repos/${owner}/${repo}/issues/${issueId}/comments`

    const response = await octokit.request('POST /repos/{owner}/{repo}/issues/{issue_number}/comments', {
        owner: process.env.NEXT_PUBLIC_AUTHOR_GITHUB_USERNAME as string,
        repo: process.env.NEXT_PUBLIC_BLOG_REPO_NAME as string,
        issue_number: issueId,
        body: body,
        headers: {
           'X-GitHub-Api-Version': '2022-11-28'
       }
   })
    const data = response.data
    console.log(data)
    return {
        ...data
    } as CommentDataModelProps
}