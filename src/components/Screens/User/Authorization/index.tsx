"use client"
import Button from "@/components/Button";
import { ButtonType } from "@/components/Button/types";
import Input from "@/components/Input";
import useInputReducer from "@/hooks/useInputReducer";

import s from "./Authorization.module.scss"
import { AuthorizationProps } from "./types";
import { Stages } from "../Authentication/types";
import { FormEvent } from "react";
import { Client } from "@/client";
import { useToastQueue } from "@/shared/ToastQueueProvider";
import Scrollbar from "@/components/Scrollbar";


export default function({ setStage } : AuthorizationProps) {
    const toastQueue = useToastQueue()
    const [email, emailDispatch] = useInputReducer()
    const [password, passwordDispatch] = useInputReducer()

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (email.validateResult && password.validateResult) {
            await Client.auth.login(email.value, password.value)
            window.open("/", "_self");
        } else {
            toastQueue.add("Проверьте, правильно ли вы ввели данные")
        }
    }
    return (
        <Scrollbar className={s.Scroll}>
            <form onSubmit={handleSubmit} className={s.authorizationForm}>
                <h1>Вход</h1>
                <div className={s.authorizationControllers}>
                    <div className={s.authorizationInputs}>
                        <Input 
                            type="email" state={email} 
                            dispatch={emailDispatch} placeholder="Почта пользователя"
                        />
                        <Input 
                            type="password" state={password} 
                            dispatch={passwordDispatch} placeholder="Пароль"
                        />
                    </div>
                    <div className={s.authorizationButtons}>
                        <Button type={ButtonType.MainColor}>
                            Войти
                        </Button>
                        <Button 
                            type={ButtonType.PrimaryDark} 
                            onClick={() => setStage(Stages.Registration)}
                        >
                            Зарегестрироваться
                        </Button>
                    </div>
                </div>
            </form>
        </Scrollbar>
    )
}