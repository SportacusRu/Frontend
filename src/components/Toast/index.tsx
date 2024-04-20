import Image from "next/image";
import s from "./Toast.module.scss";
import { ToastProps } from "./types";
import { useEffect, useState } from "react";
import classNames from "@/extensions/classNames";

const HIDED_CLASSES = classNames(s.toast, s.hide)
const VISIBLE_CLASSES = classNames(s.toast)

export function Toast({ children, visibility }: ToastProps) {
    const [classes, setClassses] = useState(HIDED_CLASSES);

    useEffect(() => {
        if (visibility) {
            setClassses(VISIBLE_CLASSES)
            setTimeout(() => setClassses(HIDED_CLASSES), 2500)
        }
    }, [visibility])


    return <div className={classes}>
        <h2>
            <span>
                <Image src="/break.svg" width={20} height={20} alt="" />
            </span>
            Возникла ошибка!
        </h2>
        <p>
            {children}
        </p>
    </div>
}