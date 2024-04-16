"use client"
import { InputProps } from "./types";
import validateInputString from "@/extensions/validate";


export default function StringInput({ 
    type, state, dispatch, ...props 
}: InputProps): JSX.Element {
    const onChange = (text: string) => {
        const validate = validateInputString(state.value, type);
        dispatch({ type: "REPLACE", payload: text })
        dispatch({ type: "VALIDATE", payload: validate })
    }

    return <input
        type={type}
        value={state?.value} 
        onChange={(e) => onChange(e.target.value)}
        {...props} 
    />
}
