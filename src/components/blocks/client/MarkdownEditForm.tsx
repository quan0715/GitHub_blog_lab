'use client'
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Textarea} from "@/components/ui/textarea";
import {MarkdownDisplay} from "@/components/blocks/MarkdownDisplay";
import React from "react";

type MarkdownEditFormProps = {
    body: string,
    onInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void,
    // props: any
}

export function MarkdownEditForm({body, onInputChange}: MarkdownEditFormProps) {
    return (
        <Tabs defaultValue="Write" className="w-full" >
            <TabsList>
                <TabsTrigger value="Write">撰寫</TabsTrigger>
                <TabsTrigger value="Preview">預覽</TabsTrigger>
            </TabsList>
            <TabsContent value="Write">
                <Textarea placeholder={"留言內容"} onChange={
                    (e) => {
                        onInputChange(e)
                        console.log('e.target.value', e.target.value)
                        // setContent(e.target.value)
                    }
                } value={body} />
            </TabsContent>
            <TabsContent value="Preview">
                <MarkdownDisplay source={body}/>
            </TabsContent>
        </Tabs>
    )
}