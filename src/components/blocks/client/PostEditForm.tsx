'use client'

import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import React from "react";
import {GithubUserModelProps, IssueEntity} from "@/models/IssueModel";
import {Button} from "@/components/ui/button";
import {MarkdownDisplay} from "@/components/blocks/MarkdownDisplay";
import {useRouter} from "next/navigation";
import {toast} from "sonner";
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {createNewIssue, updateIssue} from "@/actions/githubIssue";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {GithubAvatar} from "@/components/blocks/GithubAvatar"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {Textarea} from "@/components/ui/textarea";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Edit, Loader2, Plus} from "lucide-react";

const formSchema = z.object({
    title: z.string().min(1,  {
        message: '標題為必填'
    }),
    body: z.string().min(30, {
        message: '內文至少要 30 個字'
    }),
})

type PostEditFormProps = {
    author: GithubUserModelProps,
    issueNumber?: number | null, // if issueId is not null, then it is in edit mode
    issueEntity?: IssueEntity | null // if issueEntity is not null, then it is in edit mode
}

export function PostEditForm({author, issueEntity = {} as IssueEntity, issueNumber = null}: PostEditFormProps){

    const [loading, setLoading] = React.useState(false)
    const route = useRouter()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: issueEntity?.title || '',
            body: issueEntity?.body || '',
        }
    })

    async function onSubmit(values: z.infer<typeof formSchema>){
        // console.log('values', values)
        setLoading(true)
        if(issueNumber !== null) {
            const updatedIssue = await updateIssue({
                issueId: issueNumber,
                open: true,
                issueEntity: {
                    title: values.title,
                    body: values.body,
                    assignee: author.login
                } as IssueEntity
            })
            setLoading(prevState => false)
            route.refresh()
            toast.success('更新成功')

        }else{
            const newIssue = await createNewIssue({
                title: values.title,
                body: values.body,
                assignee: author.login
            } as IssueEntity)
            setLoading(prevState => false)
            route.push(`/${newIssue.number}`)
            toast.success('建立成功')
        }
    }

    return (
       <Card className={"w-full h-full"}>
            <CardContent className={"p-4"}>
                <Form {...form} >
                    <form className={"w-full grid grid-cols-1 gap-5"} onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="flex flex-col items-start space-y-2 py-2">
                            <Label htmlFor="name">作者</Label>
                            <GithubAvatar author={author}/>
                        </div>
                        <FormField name={"title"} render={({field}) => (
                            <FormItem>
                                <FormLabel>文章標題</FormLabel>
                                <FormDescription>
                                    你的文章（Repo）標題
                                </FormDescription>
                                <FormControl>
                                    <Input placeholder="文章標題" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}></FormField>
                        <FormField name={"body"}
                                   render={({field}) => (
                            <FormItem>
                                <FormLabel>文章內文</FormLabel>
                                <FormDescription>
                                    文章內文需要至少 30 個字
                                </FormDescription>
                                <FormControl>
                                    {/*<MarkdownEditForm body={form.getValues('body')} props={field}/>*/}
                                    <Tabs defaultValue="Write" className="w-full" >
                                        <TabsList>
                                            <TabsTrigger value="Write">撰寫</TabsTrigger>
                                            <TabsTrigger value="Preview">預覽</TabsTrigger>
                                        </TabsList>
                                        <TabsContent value="Write">
                                            <Textarea className={"min-h-72 max-h-96"} placeholder={"留言內容"} {...field}/>
                                        </TabsContent>
                                        <TabsContent value="Preview">
                                            <Card className={"h-full overflow-scroll"}>
                                                <CardContent className={"p-4 h-fit "}>
                                                    <MarkdownDisplay source={form.getValues('body')}/>
                                                </CardContent>
                                            </Card>
                                        </TabsContent>
                                    </Tabs>
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}></FormField>
                        <Button type={"submit"} disabled={!form.formState.isValid}>
                            {
                                loading
                                    ? <div className={"flex flex-row space-x-4"}>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        {
                                            issueNumber !== null
                                                ? '更新中...'
                                                : '建立中...'
                                        }
                                     </div>
                                    : <div className={"flex flex-row space-x-4"}>
                                        <Edit className={"w-6 h-6 mr-2"}/>
                                        {
                                            issueNumber !== null
                                                ? '更新貼文'
                                                : '建立貼文'
                                        }
                                    </div>
                            }
                        </Button>
                    </form>
                </Form>
            </CardContent>
       </Card>
    );
}
