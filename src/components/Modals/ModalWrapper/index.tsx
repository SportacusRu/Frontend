"use client";
import { ReactNode, useEffect, useState } from "react";
import Modal from "..";

import s from "./ModalWrapper.module.scss"
import Link from "@/components/Link";
import Icon from "@/components/Icon";
import { Icons } from "@/components/Icon/types";


export default function({children, onCancelHandler, isTransition}: {
    children: ReactNode, onCancelHandler: () => void, isTransition?: boolean
}) {
    const [opacity, setOpacity] = useState(0);

    useEffect(() => setOpacity(1), [])

    const handleOnCancel = () => {
        if (isTransition) setOpacity(0)
        setTimeout(() => onCancelHandler(), 300)
    }
    return (
        <Modal background={true} top={true} opacity={opacity}>
            <div className={s.ModalWrapper} style={{opacity: opacity}}>
                <Link
                    icon={<Icon type={Icons.arrowLeft}/>}
                    onClick={handleOnCancel}
                >
                    Назад
                </Link>
                {children}
            </div>
        </Modal>
    )
}