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
    console.log(nextURL)
    useEffect(() => {
        if(inView && _nextURL !== undefined){
            // const refetch = getAllIssue.bind(_nextURL)
            startTransition(
                async  () => {
                    const res = await getAllIssue(_nextURL)
                    // console.log('res', res.next)
                    setIssueData([..._issueData, ...res.data])
                    setNextURL(res.next)
                }
            )
            // getAllIssue(_nextURL).then((result) => {
            //     setIssueData([..._issueData, ...result.data])
            //     setNextURL(result.issues.next)
            // })
            // setIssueData([..._issueData, ..._issueData])

            // console.log("inView", inView)

        }
    }, [inView,]);

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
            <div ref={ref} className={"w-full flex justify-center items-center"}>
                {
                    _nextURL === undefined
                        ? <div className={"text-center text-gray-500"}>No more issues</div>
                        :  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                }
            </div>


        </div>
    );
}