"use client"
import { ChangeEvent } from "react";
import { TextAreaProps } from "./types";
import validateInputString from "@/extensions/validate";
import { Caption } from "../Typography";


export default function TextArea({ 
    type, state, dispatch, ...props 
}: TextAreaProps): JSX.Element {
    const onChange = (text: string) => {
        const validate = validateInputString(text, "textarea");
        if (state.value.length >= 50 && text.length >= 50) return
        dispatch({ type: "REPLACE", payload: text })
        dispatch({ type: "VALIDATE", payload: validate })
    }

    return <div className="textAreaWrapper">
        <textarea
            value={state?.value} 
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => onChange(e.target.value)}
            onPaste={(e) => onChange(e.clipboardData.getData('text/plain'))}
            {...props} 
        />
        <Caption>{state.value.length}/50</Caption>
    </div>
}
