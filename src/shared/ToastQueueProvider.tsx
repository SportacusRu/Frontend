"use client";
import { createContext, useContext } from "react";
import { ToastQueue } from "../extensions/ToastQueue";


const ToastQueueContext = createContext({} as ToastQueue);

export const useToastQueue = () => useContext(ToastQueueContext);


export default function ToastQueueProvider(
    {children}: {children: React.ReactNode}
) {
    return (
        <ToastQueueContext.Provider value={new ToastQueue()}>
            {children}
        </ToastQueueContext.Provider>
    )
}