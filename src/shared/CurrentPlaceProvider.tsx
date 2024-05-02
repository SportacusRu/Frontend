"use client";
import { Client } from "@/client";
import { Places, Reviews } from "@/client/models/types";
import { createContext, useContext, useEffect, useState } from "react";

type CurrentPlace = {
    value: Places | undefined
    set: (data: Places | undefined) => void
}

type CurrentReviews = {
    value: Reviews[] | undefined
    loading: boolean
}

type CurrentPlaceContext = {
    currentPlace: CurrentPlace
    currentReviews: CurrentReviews
}

export const CurrentPlaceContext = createContext<CurrentPlaceContext>([{}, () => {}] as unknown as CurrentPlaceContext);

export const useCurrentPlace = () => useContext(CurrentPlaceContext);


export default function CurrentPlaceProvider(
    {children}: {children: React.ReactNode}
) {
    const [place, setPlace] = useState<Places | undefined>();
    const [reviews, setReviews] = useState<Reviews[] | undefined>();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleSetPlace = async (p: Places | undefined) => {
        setPlace(p)
        if (p !== undefined) {
            setIsLoading(true)
            Client.reviews.getByPlaceId(p.place_id)
            .then(r => setReviews(r))
            .finally(() => setIsLoading(false))
        } else {
            setReviews(undefined)
        }
    }

    const data = {
        currentPlace: {
            value: place,
            set: handleSetPlace,
        }, 
        currentReviews: {
            value: reviews,
            loading: isLoading
        }
    }
    return (
        <CurrentPlaceContext.Provider value={data}>
            {children}
        </CurrentPlaceContext.Provider>
    )
}