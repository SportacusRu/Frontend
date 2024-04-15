import { Places } from "@/client/models/types"
import { ComponentType, ReactNode } from "react"

export type YandexMapProps = {
    PlacesList: ReactNode,
    currentPlace: Places | undefined
}