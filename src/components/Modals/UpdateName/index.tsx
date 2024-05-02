"use client";
import ModalWrapper from "../ModalWrapper";
import Button from "@/components/Button";
import { ButtonType } from "@/components/Button/types";
import { Client } from "@/client";
import { useToastQueue } from "@/shared/ToastQueueProvider";

import s from "./UpdateName.module.scss"
import Input from "@/components/Input";
import useInputReducer from "@/hooks/useInputReducer";
import { Caption } from "@/components/Typography";
import useUserData from "@/hooks/useUserData";


export default function({onCancelHandler} : UpdateProps) {
    const toast = useToastQueue()
    const { update } = useUserData()
    const [name, nameDispatch] = useInputReducer()

    const updateHandler = async () => {
        if (name.validateResult) {
            const res = await Client.user.updateName(name.value)
            if (res.error) 
                toast.add("Что-то пошло не так! Перезагрузите страницу")
            else update()

            onCancelHandler()
        } else {
            toast.add("Имя не менее 4 и не более 20 символов!")
        }
        
    }
    return (
        <ModalWrapper onCancelHandler={onCancelHandler} isTransition={true}>
            <div className={s.UpdateName}>
                <h1>
                    Изменение имени
                </h1>
                <div className={s.UpdateNameInput}>
                    <Input 
                        type="text" 
                        state={name} dispatch={nameDispatch}
                        placeholder="Новое имя"
                    />
                    <Caption>
                        Имя не менее 4 и не более 20 символов
                    </Caption>
                </div>
                <Button type={ButtonType.MainColor} onClick={updateHandler}>
                    Сохранить
                </Button>
            </div>

        </ModalWrapper>
    )
}