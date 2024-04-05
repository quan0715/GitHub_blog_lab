import type { Metadata } from "next";
import { Noto_Sans_TC } from "next/font/google";
import React from "react";
import "@/app/globals.css";
import {Providers} from "@/app/Provider";
import {NavBar} from "@/components/blocks/NavBar";
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
                    <main className={"w-screen flex flex-col justify-center items-center"}>
                        <div className={"w-[90%] max-w-5xl"}>
                            <NavBar/>
                            {children}
                        </div>
                    </main>
                </Providers>
            </body>
        </html>
    );
}
