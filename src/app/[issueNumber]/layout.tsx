import React from 'react';

export default function RootLayout({
   children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className={"flex-grow p-4 flex-col justify-start items-center"}>
            {children}
        </div>
    );
}
