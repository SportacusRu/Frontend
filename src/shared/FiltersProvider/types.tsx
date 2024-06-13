import { Dispatch } from "react"

export type FiltersState = {
    filters: string[],
    category: string
}

export type FiltersStateActions = {
    type: "ADD_FILTER" | "REMOVE_FILTER" | "SET_CATEGORY" | "RESET",
    payload: string
}

export type FiltersContextProps = [FiltersState, Dispatch<FiltersStateActions>]