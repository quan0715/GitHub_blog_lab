'use client'
import { getAllIssue } from "@/actions/githubIssue"
import { IssueCoverCard } from "@/components/blocks/IssueCoverCard"
import { issueDataModelProps } from "@/models/IssueModel"
import { useEffect, useRef, useState, useTransition } from "react"
import { Loader2 } from "lucide-react"
import { useInView } from "framer-motion"
export function IssueDisplayList({ issueData, nextURL } : { issueData: issueDataModelProps[], nextURL?: string}) {

    const [_issueData, setIssueData] = useState<issueDataModelProps[]>(issueData)
    const [_nextURL, setNextURL] = useState<string | undefined>(nextURL)
    const ref = useRef(null)
    const isInView = useInView(ref)
    // const [ ref, inView,  ] = useInView()
    const [isPending, startTransition] = useTransition();
    console.log(nextURL)
    useEffect(() => {
        if(isInView && _nextURL !== undefined){
            startTransition(
                async  () => {
                    const res = await getAllIssue(_nextURL)
                    // console.log('res', res.next)

                    setIssueData([..._issueData, ...(res.data ?? [])])
                    setNextURL(res.next)
                }
            )
        }
    }, [isInView, _nextURL, _issueData])

    return (
        <div className={"w-full"}>
            <div className={"grid grid-cols-1 md:grid-cols-2 gap-4 py-4"}>
                {
                    issueData!==undefined
                    ? _issueData.map((item) => {
                        return (
                            <IssueCoverCard key={item.number} issue={item}/>
                        )
                    }) : null
                }
            </div>
            <div id={"blog-list-footer"} ref={ref} className={"w-full flex justify-center items-center"}>
                {
                    _nextURL === undefined
                        ? <div className={"text-center text-gray-500"}>No more issues</div>
                        :  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                }
            </div>
        </div>
    );
}