import { ReactNode } from "react";
import Modal from "..";

import s from "./ModalWrapper.module.scss"
import Link from "@/components/Link";
import Icon from "@/components/Icon";
import { Icons } from "@/components/Icon/types";


export default function({children, onCancelHandler}: {
    children: ReactNode, onCancelHandler: () => void
}) {
    return (
        <Modal background={true} top={true}>
            <div className={s.ModalWrapper}>
                <Link
                    icon={<Icon type={Icons.arrowLeft}/>}
                    onClick={onCancelHandler}
                >
                    Назад
                </Link>
                {children}
            </div>
        </Modal>
    )
}