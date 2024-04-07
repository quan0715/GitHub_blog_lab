'use client'
import {Button} from "@/components/ui/button";
import {Edit, Plus, Trash} from "lucide-react";
import Link from "next/link";
import React from "react";
import {deleteIssue} from "@/actions/githubIssue";
import {toast} from "sonner";
import {useRouter} from "next/navigation";
import {useState} from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {Loader2} from "lucide-react"
import {PostEditForm} from "@/components/blocks/client/PostEditForm";
import {GithubUserModelProps, IssueEntity} from "@/models/IssueModel";
import {revalidatePath} from "next/cache";

type EditPostButtonProps = {
    issueNumber?: number | null // if issueId is not null, then it is in edit mode
    creator: GithubUserModelProps
    issueEntity?: IssueEntity | null // if issueEntity is not null, then it is in edit mode
}
export function EditPostButton({creator, issueNumber = null, issueEntity=null}: EditPostButtonProps) {

    const [isLoading, setLoadingState] = useState(false)
    const router = useRouter()

    return (
        <Button className={"w-14 h-14 rounded-2xl"} size={"icon"} asChild>
            <Dialog>
                <DialogTrigger asChild>
                    <Button className={"w-14 h-14 rounded-xl"}>
                        <div className={"flex flex-col justify-center items-center"}>
                            {
                                issueNumber !== null
                                    ? <Edit className={"w-6 h-6"}/>
                                    : <Plus className={"w-6 h-6 font-bold"}/>
                            }
                        </div>
                    </Button>
                </DialogTrigger>
                <DialogContent className={"w-[90%] h-[90%] overflow-scroll max-h-[800px] max-w-4xl"}>
                    <DialogHeader>
                        <DialogTitle>{
                            issueNumber !== null
                                ? '編輯貼文'
                                : '建立貼文'
                        }</DialogTitle>
                        <DialogDescription>
                            {
                                issueNumber !== null
                                    ? ''
                                    : '輸入標題與內文，標題為必填，內文則限制 30 個字'
                            }
                        </DialogDescription>
                        <PostEditForm author={creator} issueNumber={issueNumber} issueEntity={issueEntity}/>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </Button>
    );
}



export function DeletePostButton({issueId}: {issueId: number}){
    const [isLoading, setLoadingState] = useState(false)
    const router = useRouter()
    const onDelete = async () => {
        setLoadingState(true)
        await deleteIssue({issueId: issueId})
        setLoadingState(prevState => false)
        router.prefetch('/')
        // revalidatePath('/')
        toast.success('刪除成功')
        router.push('/')
    }
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button className={"w-14 h-14 rounded-xl"} variant={"destructive"}>
                    <div className={"flex flex-col justify-center items-center"}>
                        <Trash className={"w-6 h-6"}/>
                    </div>
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>確定要刪除貼文嗎?</AlertDialogTitle>
                    <AlertDialogDescription>
                        此動作無法在此復原，您可以去到 GitHub Repo Issue 上再次打開它
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>取消</AlertDialogCancel>
                    <Button variant={"destructive"} onClick={onDelete} disabled={isLoading}>
                        {
                            isLoading
                                ? <div>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 刪除中...
                                </div> : '刪除'
                        }
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}