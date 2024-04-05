import React from 'react';

export default function RootLayout({
   children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className={"w-full p-4 flex flex-col justify-start items-center"}>
            {children}
        </div>
    );
}
