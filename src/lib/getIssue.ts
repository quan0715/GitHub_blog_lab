import { issueDataModelProps } from "@/models/IssueModel";
import { installationAuth } from "@/actions/githubOauth";

// gitHub app action

function getPagingURL(link: string): string | undefined {
    // console.log('next url', link)
    const match = link.match(/<([^>]+)>;\s*rel="next"/);

    if (match) {
        // const url = new URL(match[1]);
        return match[1]
        // console.log('url', url)
        // const nextPageParam = url.searchParams.get("page");
        // return nextPageParam ? Number(nextPageParam).toString() : undefined;
    }
    return undefined;
}
function hasPagination(linkHeader: string): boolean {
    return (linkHeader && linkHeader.includes(`rel=\"next\"`)) as boolean
}

const headers = {
    'X-Github-Api-Version': '2022-11-28'
}
export async function getAllIssueLib(paginationURL?: string | undefined): Promise<any>{
    try{
        const octokit = await installationAuth()
        const issue = paginationURL !== undefined
            ? await octokit.request('GET '+paginationURL, {headers: headers})
            : await octokit.request('GET /repos/{owner}/{repo}/issues',{
                owner: process.env.NEXT_PUBLIC_AUTHOR_GITHUB_USERNAME as string,
                repo: process.env.NEXT_PUBLIC_BLOG_REPO_NAME as string,
                // per_page: 10,
                headers: headers,
            })
        // console.log('issue', issue.data)
        console.log(paginationURL)
        const result = issue.data.map((item: any) => {
            return {...item}
        })
        console.log('result', result)
        const link = issue.headers.link as string
        return {
            data: result as issueDataModelProps[],
            next: hasPagination(link) ? getPagingURL(link) : ''
        }
    } catch (e) {
        console.log('error', e)
        return {}
    }
}
