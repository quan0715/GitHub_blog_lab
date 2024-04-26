'use client'
import {
    useContext,
    useEffect,
    createContext,
    useState
} from "react";
import React from 'react'
import { ThemeProvider as NextThemeProvider } from 'next-themes'
import { Analytics } from "@vercel/analytics/react"
import {GithubUserModelProps} from "@/models/IssueModel";
import {getGithubUser} from "@/actions/githubOauth";
interface ProviderProps {
    children: React.ReactNode
}
export function RootProviders({children }:ProviderProps) {
    return (
        <React.StrictMode>
            <Analytics/>
            <NextThemeProvider
                attribute="class"
                defaultTheme="system">
                {/*<UserProvider>*/}
                    {children}
                {/*</UserProvider>*/}
                {/*{children}*/}
            </NextThemeProvider>
        </React.StrictMode>

    )
}



