"use client";
import { ReactElement } from "react";
import { InputProps, TextAreaProps } from "./types";
import StringInput from "./StringInput";
import CodeInput from "./CodeInput";
import TextArea from "./TextArea";

/**
 * Returns a React element based on the input properties.
 *
 * @param {InputProps} props - The input properties for the function.
 * @return {ReactElement<InputProps>} The React element based on the input properties.
 */
function Input(props: InputProps): ReactElement<InputProps> {
    if (props.type == "number")
        return CodeInput({...props});
    else if (props.rows) 
        return TextArea({...props} as TextAreaProps);
    else 
        return StringInput({...props});
}


export default Input;