"use client"
import Button from "@/components/Button";
import { ButtonType } from "@/components/Button/types";
import Input from "@/components/Input";
import useInputReducer from "@/hooks/useInputReducer";

import s from "./Registation.module.scss"
import { Caption } from "@/components/Typography";
import { FormEvent, useState } from "react";
import { RegistationStages } from "./types";
import { useToastQueue } from "@/shared/ToastQueueProvider";
import { Client } from "@/client";
import { Stages } from "../Authentication/types";
import VerifyCode from "./verifyCode";


export default function() {
    const toast = useToastQueue()

    const [name, nameDispatch] = useInputReducer()
    const [email, emailDispatch] = useInputReducer()
    const [password, passwordDispatch] = useInputReducer()
    const [verifyPassword, verifyPasswordDispatch] = useInputReducer()

    const [authKey, setAuthKey] = useState<string>("")
    const [stage, setStage] = useState(RegistationStages.Start)

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (name.validateResult 
            && email.validateResult 
            && password.validateResult) {
            if (password.value == verifyPassword.value) {
                const auth_key = await Client.auth.register(
                    name.value, email.value, password.value
                )
                setAuthKey(auth_key)
                setStage(RegistationStages.verifyCode)
            } else {
                toast.add("Пароли не совпадают!")
            }
        } else {
            toast.add("Проверьте, что все данные введены верно")
        }
    }
    return <>
        {
        stage == RegistationStages.Start ? 
            <>
                <form onSubmit={handleSubmit} className={s.registrationForm}>
                <div className={s.registrationTitle}>
                    <h1>Регистрация<br />в Sportacus</h1>
                    <p>Создайте аккаунт в Sportacus и получите доступ к дополнительным функциям!</p>
                </div>
                <div className={s.registrationControllers}>
                    <div className={s.registrationInputs}>
                        <Input 
                            type="text" state={name} 
                            dispatch={nameDispatch} placeholder="Имя"
                        />
                        <Input 
                            type="password" state={password} 
                            dispatch={passwordDispatch} placeholder="Пароль"
                        />
                        <Input 
                            type="password" state={verifyPassword} 
                            dispatch={verifyPasswordDispatch} 
                            placeholder="Подтверждение пароля"
                        />
                        <Input 
                            type="email" state={email} 
                            dispatch={emailDispatch} 
                            placeholder="Почта пользователя"
                        />
                    </div>
                    <div className={s.registrationButtons}>
                        <Button type={ButtonType.MainColor}>
                            Продолжить
                        </Button>
                        <Caption>
                            Имя не менее 4 и не более 20 символов,
                            <br/>
                            пароль не менее 6 символов
                        </Caption>
                    </div>
                </div>
            </form> 
        </> : <VerifyCode 
                    authKey={authKey} 
                    email={email.value}
                    password={password.value}
                />
        }
    </>
}