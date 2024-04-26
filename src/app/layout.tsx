import type { Metadata } from "next"
import { Noto_Sans_TC } from "next/font/google"
import React from "react"
import "@/app/globals.css"
import {RootProviders} from "@/Providers/RootProvider"
import {NavBar} from "@/components/blocks/client/NavBar"
import {Toaster} from "@/components/ui/sonner"
import {EditPostButton} from "@/components/blocks/client/EditPostButton"
const notoSansTC = Noto_Sans_TC({ subsets: ["latin"] })
import {UserProvider} from "@/Providers/UserProvider"
import {GithubUserModelProps} from "@/models/IssueModel";
import {getGithubUser} from "@/actions/githubOauth";
export const metadata: Metadata = {
    title: "Github Blog System Lab",
};

export async function GetUserProvider({children}: Readonly<{children: React.ReactNode}>){
    let user : GithubUserModelProps | null = null

    try{
        user = await getGithubUser()
    }catch(e) {
        console.log('user not found')
    }

    return <UserProvider user={user}>
        {children}
    </UserProvider>
}

export default function RootLayout({
   children,
}: Readonly<{children: React.ReactNode}>) {

    return (
        <html lang="en">
            <body className={`${notoSansTC.className} antialiased`}>
                <RootProviders>
                    <main>
                        <div className={"w-screen flex flex-col justify-center items-center"}>
                            <div className={"flex flex-col w-[90%] min-w-2xl max-w-5xl"}>
                                <GetUserProvider>
                                    <NavBar/>
                                    <Toaster/>
                                    {children}
                                </GetUserProvider>
                            </div>
                        </div>
                    </main>
                </RootProviders>
            </body>
        </html>
    );
}
