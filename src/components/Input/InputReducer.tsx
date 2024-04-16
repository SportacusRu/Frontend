import { InputState, InputStateActions } from "./types";

export default function(state: InputState, action: InputStateActions): InputState {
    switch (action.type) {
        case "ADD":
            return {
                ...state,
                value: state.value + action.payload
            }
        case "REMOVE":
            const id = action.payload as number;
            return {
                ...state,
                value: state.value.slice(0, id-1) + state.value.slice(id, state.value.length)
            }
        case "REPLACE":
            return {
                ...state,
                value: action.payload as string
            }
        case "VALIDATE":
            return {
                ...state,
                validateResult: action.payload as boolean
            }
    }
}