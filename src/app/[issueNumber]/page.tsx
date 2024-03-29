import {getIssueById, renderMarkdown} from "@/actions/githubIssue";
import Markdown from "react-markdown";
import {IssueCoverCard} from "@/ui/IssueCoverCard";
import {is} from "unist-util-is";
import {IssueModel} from "@/models/IssueModel";


export default async function PostPage({params} : {params: {issueNumber: string}}){
    const issue = await getIssueById({issueId: parseInt(params.issueNumber)})
    const issueModel = new IssueModel(issue)

    const content = await renderMarkdown({markdown: issueModel.metadata.body})

    return (
        <div className={"bg-yellow-50 m-12 p-12 flex flex-col"}>
            <IssueCoverCard issue={issue}></IssueCoverCard>
            <div className={"p-4"}>
                {/*<Markdown>{issue.body}</Markdown>*/}
                <div dangerouslySetInnerHTML={{__html: content}}/>
            </div>
        </div>
    )
}