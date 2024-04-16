"use client";
import { Client } from "@/client";
import Button from "@/components/Button";
import { ButtonType } from "@/components/Button/types";
import Input from "@/components/Input";
import { defaultInputState } from "@/components/Input/types";
import { useReducer } from "react";

import s from "./page.module.css"
import { VerifyProps } from "../types";
import { useToastQueue } from "@/shared/ToastQueueProvider";
import InputReducer from "@/components/Input/InputReducer";


export default function Verify({ params } : VerifyProps) {
    const toastQueue = useToastQueue();
    const verify_key = params.slug;
    const [password, dispatchPassword] = useReducer(InputReducer, defaultInputState);
    const [verifyPassword, dispatchVerifyPassword] = useReducer(InputReducer, defaultInputState);

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const isPasswordMatching = password.value == verifyPassword.value;
        const isPasswordValid = password.validateResult && verifyPassword.validateResult;

        if (isPasswordMatching && isPasswordValid && verify_key) {
            const { error } = await Client.user.setNewPassword(verify_key, password.value)
            if (error) toastQueue.add("Ссылка устарела или недействительна");     
        } else {
            toastQueue.add("Пароли не совпадают или не валидны");
        }
    };
    return (
        <main>
            <form onSubmit={onSubmit} className={s.updatePassword}>
                <label className={s.title}>
                    <h1>Изменение пароля</h1>
                </label>
                <Input 
                    type="password"
                    autoComplete="off"
                    aria-label="Новый пароль"
                    autoCapitalize="off"
                    spellCheck={false}
                    placeholder="Новый пароль"
                    state={password}
                    dispatch={dispatchPassword}
                />
                <Input 
                    type="password"
                    autoComplete="off"
                    spellCheck={false}
                    aria-label="Подтвердите пароль"
                    placeholder="Подтвердите пароль"
                    autoCapitalize="off"
                    state={verifyPassword}
                    dispatch={dispatchVerifyPassword}
                />
                <Button type={ButtonType.MainColor}>Сменить пароль</Button>
            </form>
        </main>
    )
}