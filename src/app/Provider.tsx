'use client'
import React from 'react'
import { NextUIProvider } from '@nextui-org/react'
import { ThemeProvider as NextThemeProvider } from 'next-themes'
import ReactQueryProvider from "@/Providers/QueryProviders";
// import { useRouter } from 'next/navigation'

interface ProviderProps {
    children: React.ReactNode
}
export function Providers({children }:ProviderProps) {
    return (
        <React.StrictMode>
            <ReactQueryProvider>
                <NextThemeProvider
                    attribute="class"
                    defaultTheme="system">
                    {children}
                </NextThemeProvider>
            </ReactQueryProvider>
        </React.StrictMode>

    )
}