import type { Metadata } from "next";
import { Noto_Sans_TC } from "next/font/google";
import React from "react";
import "@/app/globals.css";
import {Providers} from "@/app/Provider";
import {NavBar} from "@/components/blocks/client/NavBar";
import {Toaster} from "@/components/ui/sonner";
import {EditPostButton} from "@/components/blocks/client/EditPostButton";
const notoSansTC = Noto_Sans_TC({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Github Blog System Lab",
};

export default function RootLayout({
   children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${notoSansTC.className} antialiased`}>
                <Providers>
                    <main>
                        <div className={"w-screen flex flex-col justify-center items-center"}>
                            <div className={"flex flex-col w-[90%] min-w-2xl max-w-5xl"}>
                                <NavBar/>
                                <Toaster/>
                                {children}
                            </div>
                        </div>
                    </main>
                </Providers>
            </body>
        </html>
    );
}
