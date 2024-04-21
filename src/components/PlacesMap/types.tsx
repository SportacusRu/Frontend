import { Places, Reviews } from "@/client/models/types"
import { Dispatch, SetStateAction } from "react"

export type PlacesMapProps = {
    places: Places[],
    setCurrentPlace: Dispatch<SetStateAction<Places | undefined>>
    setReviews: Dispatch<SetStateAction<Reviews[] | undefined>>
    currentPlace: Places | undefined
}