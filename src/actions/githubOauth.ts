'use server'

// create github oauth action
import {Octokit} from '@octokit/core'
import {NextResponse} from "next/server";
import {cookies} from "next/headers";
import { App } from "octokit";
import { createAppAuth } from "@octokit/auth-app";







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

type GithubUser = {
    userName: string,
    avatar: string
}
export {
    getGithubUser, githubAction, getGithubIssues,
}