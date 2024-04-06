'use client'
import React, {useState} from "react";
import {Sun, Moon} from "lucide-react";
import {Button} from "@/components/ui/button";
import { useTheme } from "next-themes"
import Image from "next/image";

function LightThemeIcon(){
    return (
        <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"/>
    )
}

function DarkThemeIcon(){
    return (
        <Moon className="h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"/>
    )
}
export function ThemeSwitcherButton() {
    const [isDark, setIsDark] = useState(false)

    const { theme, setTheme } = useTheme()
    const toggleTheme = () => {
        theme === "dark"
            ? setTheme("light")
            : setTheme("dark")
    }

    return (
        <Button variant="outline" size="icon" onClick={toggleTheme}>
            {
                theme === "dark"  ? <DarkThemeIcon/> : <LightThemeIcon/>
            }
        </Button>
    )
}

export function Logo() {
    const lightLogoFileName = "/light_logo.png"
    const darkLogoFileName = "/dark_logo.png"
    const logoPath = useTheme().theme === "dark" ? darkLogoFileName : lightLogoFileName
    return (
        <Image src={logoPath} alt={"logo"} width={100} height={40} />
    )
}