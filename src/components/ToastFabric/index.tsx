"use client"

import { useToastQueue } from "@/shared/ToastQueueProvider"
import { useEffect } from "react";
import { Toast } from "../Toast";

import s from "./ToastFabric.module.scss";

export default function() {
    const toastQueue = useToastQueue(); 
    useEffect(() => {
        if (toastQueue.peek() !== undefined) {
            setTimeout(() => toastQueue.pop(), 3000);
        }
    }, [toastQueue.queue]);

    return (
        <div className={s.toastFabric}>
        {
            toastQueue.queue.map(toast => <Toast key={toast.id} visibility={true}>
                {toast.value}
            </Toast>)
        }
        </div>
    )
}