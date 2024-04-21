import { Places, Reviews } from "@/client/models/types"

export type ViewProps = {
    places: Places[]
    reviews: Reviews[] | undefined
    currentPlace: Places | undefined
}