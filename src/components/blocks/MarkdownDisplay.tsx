import {serialize} from "next-mdx-remote/serialize";
import React from "react";
import {MDXRemote} from "next-mdx-remote/rsc";
import Markdown from 'react-markdown'

export function MarkdownDisplay({source}: {source: string}) {
    return (
        <article className="max-w-none w-full prose prose-base prose-slate dark:prose-invert">
            <Markdown>{source}</Markdown>
        </article>
    );
}