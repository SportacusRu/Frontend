"use client";
import Button from "@/components/Button";
import { ButtonType } from "@/components/Button/types";
import Input from "@/components/Input";
import { defaultInputState } from "@/components/Input/types";
import { useReducer } from "react";

import s from "./page.module.css"
import { VerifyProps } from "../types";
import { useToastQueue } from "@/shared/ToastQueueProvider";
import InputReducer from "@/components/Input/InputReducer";
import setNewPassword from "@/client/controllers/passwordValidate";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "@/components/Link";


export default function Verify({ params } : VerifyProps) {
    const toastQueue = useToastQueue();
    const router = useRouter();
    const [password, dispatchPassword] = useReducer(InputReducer, defaultInputState);
    const [verifyPassword, dispatchVerifyPassword] = useReducer(InputReducer, defaultInputState);
    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (password.value == verifyPassword.value && password.validateResult)
            await setNewPassword(params.slug, password, toastQueue, router);

        else toastQueue.add("Пароли не совпадают или меньше 6 символов");
    }
    return (
        <main>
            <form onSubmit={onSubmit} className={s.updatePassword}>
                <Link href="/">
                    <Image src={"/logo.svg"} width={152} height={29} alt="Sportacus"/>
                </Link>
                <label className={s.title}>
                    <h1>Изменение пароля</h1>
                </label>
                <div className={s.updatePasswordInputs}>
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
                </div>
                <Button type={ButtonType.MainColor}>Изменить пароль</Button>
            </form>
        </main>
    )
}