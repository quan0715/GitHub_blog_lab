'use client'
import React from 'react'
import { NextUIProvider } from '@nextui-org/react'
import { ThemeProvider as NextThemeProvider } from 'next-themes'
// import { useRouter } from 'next/navigation'

interface ProviderProps {
    children: React.ReactNode
}
export function Providers({children }:ProviderProps) {
    // const router = useRouter();
    return (
        <React.StrictMode>
            <NextUIProvider>
                <NextThemeProvider attribute="class" defaultTheme="dark">
                    {children}
                </NextThemeProvider>
            </NextUIProvider>
        </React.StrictMode>

    )
}