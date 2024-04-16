"use client";
import { useRef } from "react";
import { InputProps } from "./types";
import { range, onChange, onKeyDown } from "./codeExtensions";

import s from "./CodeInput.module.css"

export default function CodeInput({
  type, state, dispatch, ...props
}: InputProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className={s.codeInput}>
      {range.map(i => (
        <input
          key={i}
          type={type}
          value={state.value.charAt(i)}
          placeholder="0"
          onChange={(e) =>
            onChange(e.target.value, i, state, dispatch, containerRef)
          }
          onKeyDown={(e) =>
            onKeyDown(e, i, dispatch, containerRef)
          }
          {...props}
        />
      ))}
    </div>
  );
}

