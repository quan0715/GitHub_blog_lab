import {
    installationAuth,
} from "@/actions/githubOauth";

import {CommentDataModelProps} from '@/models/CommentModel'
import {issueDataModelProps} from "@/models/IssueModel";

const headers = {
    'X-Github-Api-Version': '2022-11-28'
}
export async function getAllIssueComments({issueId}: {issueId: number}): Promise<CommentDataModelProps[]> {
    try{
        const octokit = await installationAuth()
        const issue = await octokit.request('GET /repos/{owner}/{repo}/issues/{issue_number}/comments',{
            owner: process.env.AUTHOR_GITHUB_USERNAME as string,
            repo: process.env.BLOG_REPO_NAME as string,
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