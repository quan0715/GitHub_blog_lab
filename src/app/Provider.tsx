'use client'
import React from 'react'
import { ThemeProvider as NextThemeProvider } from 'next-themes'
import { Analytics } from "@vercel/analytics/react"
interface ProviderProps {
    children: React.ReactNode
}
export function Providers({children }:ProviderProps) {
    return (
        <React.StrictMode>
            <Analytics/>
            <NextThemeProvider
                attribute="class"
                defaultTheme="system">
                {children}
            </NextThemeProvider>
        </React.StrictMode>

    )
}