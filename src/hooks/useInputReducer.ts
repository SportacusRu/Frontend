import InputReducer from "@/components/Input/InputReducer";
import { InputState } from "@/components/Input/types";
import { useReducer } from "react";

export default function() {
    return useReducer(InputReducer, {value: ""} as InputState)
}