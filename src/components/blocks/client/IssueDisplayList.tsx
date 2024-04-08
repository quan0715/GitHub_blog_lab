'use client'
import { useInfiniteQuery } from '@tanstack/react-query'
import {getAllIssue, getIssueResultProps} from "@/actions/githubIssue";
import {IssueCoverCard} from "@/components/blocks/IssueCoverCard";
import {issueDataModelProps} from "@/models/IssueModel";
import {useEffect , useState, useTransition} from "react";
import {useInView} from "react-intersection-observer";
import {Loader2} from "lucide-react";
export function IssueDisplayList({ issueData, nextURL } : { issueData: issueDataModelProps[], nextURL?: string}) {

    const [_issueData, setIssueData] = useState<issueDataModelProps[]>(issueData)
    const [_nextURL, setNextURL] = useState<string | undefined>(nextURL)
    const [ ref, inView,  ] = useInView()
    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        if(inView && _nextURL !== undefined){
            startTransition(
                () => {
                    getAllIssue(_nextURL).then((result) => {
                        setIssueData([..._issueData, ...result.data])
                        setNextURL(result.issues.next)
                    })
                }
            )
            // getAllIssue(_nextURL).then((result) => {
            //     setIssueData([..._issueData, ...result.data])
            //     setNextURL(result.issues.next)
            // })
            // setIssueData([..._issueData, ..._issueData])

            console.log("inView", inView)

        }
    }, [inView, _issueData, _nextURL]);

    return (
        <div className={"w-full"}>
            <div className={"grid grid-cols-1 md:grid-cols-2 gap-4 py-4"}>
                {
                    // infiniteQuery.data?.pages.map((issue) => {
                    issueData!==undefined
                    ? _issueData.map((item) => {
                        return (
                            <IssueCoverCard key={item.number} issue={item}/>
                        )
                    }) : null
                    // })
                }
            </div>
            {/*{*/}
            {/*    _nextURL === undefined ? : null*/}
            {/*}*/}
            {/*<div className={"text-center text-gray-500"}>No more issues</div>*/}
            {/*<Loader2 className="mr-2 h-4 w-4 animate-spin" ref={ref}/>*/}
        </div>
    );
}