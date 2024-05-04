import Button from "@/components/Button";
import ModalWrapper from "../ModalWrapper";
import { ButtonType } from "@/components/Button/types";

import s from "./ShareLink.module.css"


export default function ({onCancelHandler, link} : {onCancelHandler: () => void, link: string}) {
    const handlerClick = () => {
        navigator.clipboard.writeText(link)
        onCancelHandler()
    }
    return (
        <ModalWrapper onCancelHandler={onCancelHandler} isTransition={true}>
            <div className={s.ShareLink}>
                <h1>Поделитесь ссылкой!</h1>
                <Button type={ButtonType.MainColor} onClick={handlerClick}>
                    Скопировать ссылку
                </Button>
            </div>
        </ModalWrapper>
    )
}
