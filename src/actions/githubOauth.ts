'use server'

import {Octokit} from '@octokit/core'
import {cookies} from "next/headers";
import {GithubUserModelProps} from "@/models/IssueModel";

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
            console.log('token expired')
            return ''
        }
    }
    catch (e){
        console.log('token expired')
        return ''
    }
    return token.value
}

export async function getGithubUser(): Promise<GithubUserModelProps | null> {

    const token = await getTokenFromCookie()
    // console.log('token', token)
    if(token === undefined || token?.length === 0){
       throw new Error('token not found')
    }
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

export async function githubSignOut(){
    // clear login token
    console.log('clear token')
    cookies().set('access_token', '', {
        maxAge: 0
    })
}
