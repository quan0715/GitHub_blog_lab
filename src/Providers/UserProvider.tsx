'use client'
import React, {createContext, useEffect, useState, useMemo, useCallback, useTransition} from "react";
import {GithubUserModelProps} from "@/models/IssueModel";
import {getGithubUser} from "@/actions/githubOauth";

interface ProviderProps {
    children: React.ReactNode,
    user: GithubUserModelProps | null
}

type UserContextProps = {
    user: GithubUserModelProps | null
    setUserContext: React.Dispatch<React.SetStateAction<UserContextProps>>
}

const defaultUserContext: UserContextProps = {
    user: null,
    setUserContext: () => {}
}
export const UserContext = createContext<UserContextProps>(defaultUserContext)

export function UserProvider({children, user}: ProviderProps) {

    const [userContext, setUserContext] = useState<UserContextProps >({
        ...defaultUserContext,
        user: user
    })

    useEffect(() => {
        getGithubUser().then((res) => {
            setUserContext({
                user: res,
                setUserContext: setUserContext
            })
        }).catch((e) => {
            console.log('user not found')
        })
    }, []);

    return (
        <UserContext.Provider value={userContext}>
            {children}
        </UserContext.Provider>
    )
}