import { Places } from "@/client/models/types"

export type PlaceProps = {
    handleDislike?: () => void
    recommended?: boolean
    place: Places
}
