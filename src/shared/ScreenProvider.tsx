"use client";
import { Client } from "@/client";
import { createContext, useEffect, useState } from "react";

export enum PAGES {
    Main, Map, Profile
};

type screenContextType = [PAGES, (page: PAGES) => void];

export const ScreenContext = createContext<screenContextType>([0, () => {}] as screenContextType);


export default function ScreenProvider(
    {children}: {children: React.ReactNode}
) {
    const [screen, setScreen] = useState<PAGES>(0);
    const [auth, setAuth] = useState(false)

    useEffect(() => {
        setScreen(Client.authorized ? PAGES.Main : PAGES.Map)
        setAuth(Client.authorized)
    }, [])

    const setScreenHandler = (page: PAGES) => setScreen(
        !auth && page == PAGES.Main ? PAGES.Map : page
    );
    return (
        <ScreenContext.Provider value={[screen, setScreenHandler]}>
            {children}
        </ScreenContext.Provider>
    )
}