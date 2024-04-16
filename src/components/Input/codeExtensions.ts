import { Dispatch } from "react";
import { InputState, InputStateActions } from "./types";
import { CODE_LENGTH } from "@/config/config";
import { KeyboardEvent } from "react";

const range = Array.from({ length: CODE_LENGTH }, (_, index) => index);


function onKeyDown(
  event: KeyboardEvent<HTMLInputElement>,
  id: number,
  dispatch: Dispatch<InputStateActions>,
  containerRef: React.RefObject<HTMLDivElement>
) {
  if (event.key === "Backspace") {
    if (event.currentTarget.value == "") {
      dispatch({ type: "REMOVE", payload: id });
      moveFocus(containerRef, id - 1);
    } else {
      dispatch({ type: "REMOVE", payload: id + 1 });
    }
  }

  const notValidKey = /^[А-Яа-яA-Za-z ]$/.test(event.key);
  if (notValidKey) event.preventDefault();
}


function onChange(
    text: string, 
    id: number,
    state: InputState,
    dispatch: Dispatch<InputStateActions>, 
    containerRef: React.RefObject<HTMLDivElement>
) {
    if (state.value.length < range.length) {
        dispatch({ type: "ADD", payload: text })
        moveFocus(containerRef, id+1);
    } else {
        dispatch({ type: "VALIDATE", payload: true })
    }
}


function moveFocus(containerRef: React.RefObject<HTMLDivElement>, id: number) {
    const container = containerRef.current;
    if (container && container.children.length > id && id < range.length) {
        const nextInput = container.children[id] as HTMLInputElement;
        nextInput.focus();
    } else if (container && container.children.length > 0) {
        const currentInput = container.children[id - 1] as HTMLInputElement;
        currentInput.blur();
    }
}

export { range, onKeyDown, onChange }