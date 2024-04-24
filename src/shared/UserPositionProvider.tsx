"use client";
import { SetStateAction, createContext, useContext, Dispatch, useState } from "react";
import { LngLat } from "@yandex/ymaps3-types";

type UserPositionType = {
    position: LngLat
    setPosition: Dispatch<SetStateAction<LngLat>>
}

const UserPositionContext = createContext<UserPositionType>({} as UserPositionType);

export const useUserPosition = () => useContext(UserPositionContext);


export default function UserPositionProvider(
    {children}: {children: React.ReactNode}
) {
    const [value, setValue] = useState<LngLat>([60.658035, 56.842906] as LngLat)
    const userPosition = {position: value, setPosition: setValue}
    return (
        <UserPositionContext.Provider value={userPosition}>
            {children}
        </UserPositionContext.Provider>
    )
}