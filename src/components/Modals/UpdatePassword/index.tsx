"use client";
import Image from "next/image";
import ModalWrapper from "../ModalWrapper";
import Button from "@/components/Button";
import { ButtonType } from "@/components/Button/types";
import { Client } from "@/client";
import { useToastQueue } from "@/shared/ToastQueueProvider";

import s from "./UpdatePassword.module.scss"
import { useState } from "react";
import { UpdatePasswordStages } from "./types";


export default function({onCancelHandler} : UpdateProps) {
    const toast = useToastQueue()
    const [stage, setStage] = useState<UpdatePasswordStages>(
        UpdatePasswordStages.Start
    )
    const repeatHandler = async () => {
        const res = await Client.user.updatePassword()
        if (res.error) {
            toast.add("Что-то пошло не так! Перезагрузите страницу")
        }
    }

    const updateStageHandler = async () => {
        setStage(UpdatePasswordStages.Update) 
        const res = await Client.user.updatePassword();
        if (res.error) 
            toast.add("Что-то пошло не так! Перезагрузите страницу");    
    }

    return (
        <ModalWrapper onCancelHandler={onCancelHandler} isTransition={true}>
            <div className={s.UpdatePassword}>
                {stage != UpdatePasswordStages.Start ? <Image 
                    src={"/emailSend.svg"} 
                    height={100} width={100} 
                    alt="email send"
                /> : <></>}
                <div className={s.UpdatePasswordContent}>
                    <div className={s.UpdatePasswordText}>
                        {stage != UpdatePasswordStages.Start ? <>
                            <h1>
                                Проверьте почту
                            </h1>
                            <p>
                                На вашу почту была отправлена ссылка для изменения пароля.
                            </p>
                        </> : <>
                            <h1>
                                Изменение <br /> пароля
                            </h1>
                            <p>
                                Мы отправим вам письмо по почте с ссылкой на изменения пароля.
                            </p>
                        </>}
                    </div>
                    {stage != UpdatePasswordStages.Start ? <Button type={ButtonType.PrimaryDark} onClick={repeatHandler}>
                        Повторить отправку
                    </Button> 
                    : <Button type={ButtonType.MainColor} onClick={updateStageHandler}>
                        Получить ссылку
                    </Button>}
                </div>
            </div>

        </ModalWrapper>
    )
}