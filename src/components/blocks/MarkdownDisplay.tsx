'use client'
import {serialize} from "next-mdx-remote/serialize";
import React from "react";
import {MDXRemote} from "next-mdx-remote/rsc";
import Markdown from 'react-markdown'
import { motion, useScroll, useMotionValueEvent } from "framer-motion"
export function MarkdownDisplay({source}: {source: string}) {



    const { scrollYProgress } = useScroll()

    // useMotionValueEvent(scrollY, "change", (latest) => {
    //     console.log("Page scroll: ", latest)
    // })
    return (
        <article className="max-w-none w-full prose prose-base prose-slate dark:prose-invert">
            <motion.div className={"fixed top-0 left-0 right-0 transition-transform bg-primary h-2 rounded-2xl"} style={{
                transformOrigin: 0,
                scaleX: scrollYProgress,
            }} />
            <Markdown>{source}</Markdown>
            {/*}}/>*/}
        </article>
    );
}