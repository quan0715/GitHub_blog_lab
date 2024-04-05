
import {issueDataModelProps, IssueModel} from "@/models/IssueModel";
import {
    installationAuth,
} from "@/actions/githubOauth";


const headers = {
    'X-Github-Api-Version': '2022-11-28'
}
export async function getIssueList() {
    try{
        const octokit = await installationAuth()
        const issue = await octokit.request('GET /repos/{owner}/{repo}/issues',{
            owner: process.env.AUTHOR_GITHUB_USERNAME as string,
            repo: process.env.BLOG_REPO_NAME as string,
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

export async function getIssueById({issueId}: {issueId: number}): Promise<issueDataModelProps> {
    try{
        const octokit = await installationAuth()
        const res = await octokit.request('GET /repos/{owner}/{repo}/issues/{issue_number}', {
            owner: process.env.AUTHOR_GITHUB_USERNAME as string,
            repo: process.env.BLOG_REPO_NAME as string,
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

export async function renderMarkdown({markdown}: {markdown: string}): Promise<string> {
    try{
        const octokit = await installationAuth()
        const res = await octokit.request('POST /markdown', {
            text: markdown,
            headers: {
                ...headers,
            }
        })
        return res.data
    }
    catch (e) {
        console.log('error', e)
        return ''
    }
}

