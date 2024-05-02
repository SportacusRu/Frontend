"use client";
import { Client } from "@/client";
import { User } from "@/client/models/types";
import { createContext, useEffect, useState } from "react";
import { useToastQueue } from "@/shared/ToastQueueProvider";
import { ToastQueue } from "@/extensions/ToastQueue";

export type likedListData = {
    value: Set<number> | undefined
    add: (p: number) => void
    pop: (p: number) => void
    has: (p: number) => boolean
}

type UserDataType = {
    userData: User | undefined,
    loading: boolean,
    likedList: likedListData,
    update: () => void
};

const getUserData = (
    setUserData: (u: User) => void, 
    setLikedList: (s: Set<number>) => void,
    setIsLoading: (loading: boolean) => void,
    toastQueue: ToastQueue
) => {
    if (Client.authorized) {
        Client.user.get()
        .then((u) => {
            setUserData(u)
            console.log(u.like_list.map(p => p.place_id))
            setLikedList(new Set<number>(u.like_list.map(p => p.place_id)))
        })
        .catch(() => toastQueue.add("Ошибка соединения! Обновите страницу"))
        .finally(() => setIsLoading(false))
    }
}

export const UserDataContext = createContext<UserDataType>({} as UserDataType);

export default function UserDataProvider(
    {children}: {children: React.ReactNode}
) {
    const toastQueue = useToastQueue()
    const [userData, setUserData] = useState<User>()
    const [isLoading, setIsLoading] = useState(true)
    const [likedList, setLikedList] = useState<Set<number>>()

    const update = () => getUserData(setUserData, setLikedList, setIsLoading, toastQueue)

    useEffect(() => {
        update()
    }, [])

    const data = {
        userData: userData, 
        loading: isLoading,
        likedList: {
            value: likedList,
            add: (placeId: number) => setLikedList(likedList?.add(placeId)),
            pop: (placeId: number) => setLikedList(prev => {
                const next = new Set(prev);
                next.delete(placeId);
                return next;
            }),
            has: (placeId: number) => likedList ? likedList.has(placeId) : false
        },
        update: update
    }

    return (
        <UserDataContext.Provider value={data}>
            {children}
        </UserDataContext.Provider>
    )
}