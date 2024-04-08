'use server'

import {Octokit} from '@octokit/core'
import {cookies} from "next/headers";
import {App} from "octokit";
import {permanentRedirect} from "next/navigation";
import {GithubUserModelProps} from "@/models/IssueModel";


const authApp= new App({
    appId: process.env.GITHUB_APP_ID as string,
    privateKey: (process.env.GITHUB_PRIVATE_KEY as string).replace(/\\n/g, '\n'),
})

const USERNAME = process.env.NEXT_PUBLIC_AUTHOR_GITHUB_USERNAME as string
const REPO = process.env.NEXT_PUBLIC_BLOG_REPO_NAME as string
const HEADERS = {
    'X-Github-Api-Version': '2022-11-28'
}

export async function installationAuth(){
    const {data} = await authApp.octokit.request(`GET /users/${USERNAME}/installation`,)
    const INSTALLATION_ID = data['id']
    return await authApp.getInstallationOctokit(INSTALLATION_ID);
}

export async function getTokenFromCookie(){
    const token =  cookies().get('access_token')

    if(token === undefined || token.value === ''){
        return undefined
    }

    // check token expired
    const octokit = new Octokit({auth: token.value})
    try{
        const res = await octokit.request('GET /user',{
            headers: {
                'X-Github-Api-Version': '2022-11-28'
            }
        })
        if(res.status !== 200){
            throw new Error('token expired')
        }
    }
    catch (e){
        console.log('token expired')
        cookies().set('access_token', '', {
            maxAge: 0
        })
        return ''
    }
    return token.value
}

export async function githubActionWrapper(func: Function) {
    // get token
    const token = cookies().get('access_token')
    if (token === undefined || token.value === '') {
        console.log('token is undefined')
        return undefined
    }
    return await func(token.value)
}

async function getUserInfo(token: string) {
    // console.log('token', token)
    const octokit = new Octokit({auth: token})
    const response = await octokit.request('GET /user',{
        headers: {
            'X-Github-Api-Version': '2022-11-28'
        }
    })
    const data = response.data
    return {
        'login': data['login'],
        'avatar_url': data['avatar_url'],
    } as GithubUserModelProps
}

export async function getGithubUser(): Promise<GithubUserModelProps> {
    const token = await getTokenFromCookie()
    // console.log('token', token)
    if(token === undefined || token?.length === 0){
       throw new Error('token is undefined')
    }
    const user = await getUserInfo(token as string)
    return user
}

export async function githubSignOut(){
    // clear login token
    console.log('clear token')
    cookies().set('access_token', '', {
        maxAge: 0
    })
}
