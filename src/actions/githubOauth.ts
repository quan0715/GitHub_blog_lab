'use server'

import {Octokit} from '@octokit/core'
import {cookies} from "next/headers";
import {App} from "octokit";
import {permanentRedirect} from "next/navigation";


const authApp= new App({
    appId: process.env.GITHUB_APP_ID as string,
    privateKey: (process.env.GITHUB_PRIVATE_KEY as string).replace(/\\n/g, '\n'),
})


const USERNAME = process.env.AUTHOR_GITHUB_USERNAME as string
const REPO = process.env.BLOG_REPO_NAME as string
const HEADERS = {
    'X-Github-Api-Version': '2022-11-28'
}

export async function installationAuth(){
    const {data} = await authApp.octokit.request(`GET /users/${USERNAME}/installation`,)
    const INSTALLATION_ID = data['id']
    return await authApp.getInstallationOctokit(INSTALLATION_ID);
}

async function getUserInfo(token: string) {
    const octokit = new Octokit({auth: token})
    const response = await octokit.request('GET /user',{
        headers: {
            'X-Github-Api-Version': '2022-11-28'
        }
    })
    const data = response.data
    // console.log(data)
    return {
        userName: data['login'],
        avatar: data['avatar_url'],
    }
}

async function githubAction(func: Function) {
    // get token
    const token = cookies().get('access_token')
    if (token === undefined || token.value === '') {
        console.log('token is undefined')
        return undefined
    }
    return await func(token.value)
}

async function getGithubUser(): Promise<GithubUser> {
    const res = await githubAction(getUserInfo)
    if(res === undefined){
        return {
            userName: '',
            avatar: ''
        }
    }
    return res
}


async function githubIssue(token: string){
    const octokit = new Octokit({auth: token})
    const response = await octokit.request('GET /repos/{owner}/{repo}/issues',{
        owner: 'quan0715',
        repo: 'GithubBlogPortal',
        headers: {
            'X-Github-Api-Version': '2022-11-28'
        }
    })
    const data = response.data
    console.log(data)
    return data
}

async function getGithubIssues() {
    const res =  await githubAction(githubIssue)
    if(res === undefined){
        return []
    }
    return res
}

export async function signOut(){
    // clear login token
    console.log('clear token')
    cookies().set('access_token', '', {
        maxAge: 0
    })

    permanentRedirect('/')

}

type GithubUser = {
    userName: string,
    avatar: string
}
export {
    getGithubUser, githubAction, getGithubIssues,
}