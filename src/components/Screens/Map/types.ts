import { Places, Reviews } from "@/client/models/types"
import { Dispatch, SetStateAction } from "react"

export type MapScreenProps = { 
    places: Places[]
    setScreen: Dispatch<SetStateAction<number>>
    currentPlace?: Places
    reviews?: Reviews[]
    setCurrentPlace: Dispatch<SetStateAction<Places | undefined>>
    setReviews: Dispatch<SetStateAction<Reviews[] | undefined>>
}