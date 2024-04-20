import { Dispatch, SetStateAction } from "react"

export type NumberListProps = {
    range: number[],
    state: number
    setState: Dispatch<SetStateAction<number>>
}