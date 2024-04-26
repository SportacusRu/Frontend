import { Places, Reviews } from "@/client/models/types"
import { Dispatch, SetStateAction } from "react"

export type PlaceScreenProps = {
    currentPlace: Places, 
    reviews: Reviews[],
    setCurrentPlace: Dispatch<SetStateAction<Places | undefined>>
    setReviews: Dispatch<SetStateAction<Reviews[] | undefined>>
}