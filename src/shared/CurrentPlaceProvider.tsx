"use client";
import { Places, Reviews } from "@/client/models/types";
import { createContext, useContext, useState } from "react";

type CurrentData<T> = {
    value: T | undefined
    set: (data: T | undefined) => void
}

type CurrentPlaceContext = {
    currentPlace: CurrentData<Places>
    currentReviews: CurrentData<Reviews[]>
}

export const CurrentPlaceContext = createContext<CurrentPlaceContext>([{}, () => {}] as unknown as CurrentPlaceContext);

export const useCurrentPlace = () => useContext(CurrentPlaceContext);


export default function CurrentPlaceProvider(
    {children}: {children: React.ReactNode}
) {
    const [place, setPlace] = useState<Places | undefined>();
    const [reviews, setReviews] = useState<Reviews[] | undefined>();

    const data = {
        currentPlace: {
            value: place,
            set: setPlace
        }, 
        currentReviews: {
            value: reviews,
            set: setReviews
        }
    }
    return (
        <CurrentPlaceContext.Provider value={data}>
            {children}
        </CurrentPlaceContext.Provider>
    )
}