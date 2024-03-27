'use server'

// create github oauth action
import {Octokit} from '@octokit/core'
import {NextResponse} from "next/server";
import {cookies} from "next/headers";
async function authorize(){
    const url = 'https://github.com/login/oauth/authorize'

    const params = {
        client_id: process.env.GITHUB_CLIENT_ID,
        redirect_uri: process.env.GITHUB_REDIRECT_URI,
        scope: 'read:user user:email read:repo'
    }

    const authUrI = `${url}?client_id=${params.client_id}&redirect_uri=${params.redirect_uri}&scope=${params.scope}`
    // redirect to github oauth
    NextResponse.redirect(authUrI)
}



async function getUserInfo(token: string) {
    const octokit = new Octokit({auth: token})
    const response = await octokit.request('GET /user',{
        headers: {
            'X-Github-Api-Version': '2022-11-28'
        }
    })
    const data = response.data
    console.log(data)

    return {
        userName: data['login'],
        avatar: data['avatar_url'],
    }
}
async function githubAction(func: Function) {
    // get token
    const token = cookies().get('access_token')
    if (token === undefined) {
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

async function signOut() {
    console.log('clear token')
    // cookies().set('access_token', '', {
    //     maxAge: 0
    // })
    // return NextResponse.redirect(new URL("/",));
}

type GithubUser = {
    userName: string,
    avatar: string
}
export {
    authorize, getGithubUser, signOut
}