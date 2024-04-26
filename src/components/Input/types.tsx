import { Dispatch, InputHTMLAttributes } from "react"

export type InputState = {
    value: string,
    validateResult?: boolean
}

export type InputStateActions = {
    type: "ADD" | "REMOVE" | "REPLACE" | "VALIDATE",
    payload: string | boolean | number
}

export const defaultInputState: InputState = {
    value: "",
} 


export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    type: "text" | "email" | "password" | "number"
    state: InputState
    dispatch: Dispatch<InputStateActions>
}

