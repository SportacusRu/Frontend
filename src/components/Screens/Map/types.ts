import { Places } from "@/client/models/types"

export type MapScreenProps = { 
    places: Places[]
    modalCreate: boolean,
    setModalCreate: (value: boolean) => void
}