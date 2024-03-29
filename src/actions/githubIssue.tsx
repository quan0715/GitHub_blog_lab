import {App} from "octokit";
import {issueDataModelProps, IssueModel} from "@/models/IssueModel";


const authApp= new App({
    appId: process.env.GITHUB_APP_ID as string,
    privateKey: (process.env.GITHUB_PRIVATE_KEY as string).replace(/\\n/g, '\n'),
})
const userName = 'quan0715'
const repo = 'GithubBlogPortal'
const headers = {
    'X-Github-Api-Version': '2022-11-28'
}

async function installationAuth(){
    const {data} = await authApp.octokit.request(`GET /users/${userName}/installation`,)
    const INSTALLATION_ID = data['id']
    return await authApp.getInstallationOctokit(INSTALLATION_ID);
}

export async function getIssueList() {
    try{
        const octokit = await installationAuth()
        const issue = await octokit.request('GET /repos/{owner}/{repo}/issues',{
            owner: userName,
            repo: repo,
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
            owner: userName,
            repo: repo,
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

