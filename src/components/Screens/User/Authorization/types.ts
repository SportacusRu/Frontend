import { Dispatch, SetStateAction } from "react"
import { Stages } from "../Authentication/types"

export type AuthorizationProps = {
    setStage: Dispatch<SetStateAction<Stages>>
}