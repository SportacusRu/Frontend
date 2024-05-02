"use client";
import Image from "next/image";
import ModalWrapper from "../ModalWrapper";
import Button from "@/components/Button";
import { ButtonType } from "@/components/Button/types";
import { Client } from "@/client";
import { useToastQueue } from "@/shared/ToastQueueProvider";

import s from "./UpdatePassword.module.scss"


export default function({onCancelHandler} : UpdateProps) {
    const toast = useToastQueue()
    const repeatHandler = async () => {
        const res = await Client.user.updatePassword()
        if (res.error) {
            toast.add("Что-то пошло не так! Перезагрузите страницу")
        }
    }
    return (
        <ModalWrapper onCancelHandler={onCancelHandler}>
            <div className={s.UpdatePassword}>
                <Image 
                    src={"/emailSend.svg"} 
                    height={100} width={100} 
                    alt="email send"
                />
                <div className={s.UpdatePasswordContent}>
                    <div className={s.UpdatePasswordText}>
                        <h1>
                            Проверьте почту
                        </h1>
                        <p>
                            На вашу почту была отправлена ссылка для изменения пароля.
                        </p>
                    </div>
                    <Button type={ButtonType.PrimaryDark} onClick={repeatHandler}>
                        Повторить отправку
                    </Button>
                </div>
            </div>

        </ModalWrapper>
    )
}