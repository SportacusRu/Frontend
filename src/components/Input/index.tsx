"use client";
import { ReactElement } from "react";
import { InputProps } from "./types";
import StringInput from "./StringInput";
import CodeInput from "./CodeInput";

/**
 * Returns a React element based on the input properties.
 *
 * @param {InputProps} props - The input properties for the function.
 * @return {ReactElement<InputProps>} The React element based on the input properties.
 */
function Input(props: InputProps): ReactElement<InputProps> {
    if (props.type == "number")
        return CodeInput({...props});
    else 
        return StringInput({...props});
}


export default Input;