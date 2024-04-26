import useInputReducer from "@/hooks/useInputReducer";
import { VerifyCodeProps } from "./types";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { ButtonType } from "@/components/Button/types";
import { Client } from "@/client";
import { useToastQueue } from "@/shared/ToastQueueProvider";
import { FormEvent } from "react";

import s from "./verifyCode.module.scss"
import Link from "next/link";
import useScreen, { PAGES } from "@/hooks/useScreen";

export default function({authKey, email, password} : VerifyCodeProps) {
    const toastQueue = useToastQueue()
    const [screen, setScreen] = useScreen()
    const [code, codeDispatch] = useInputReducer()

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (code.validateResult) {
            const res = await Client.auth.validateCodeConfirm(
                code.value, email, authKey
            )
            if (res.error) {
                toastQueue.add("Код введён неверно!")
            } else {
                await Client.auth.login(email, password)
                window.open("/", "_self");
            }
        } else {
            toastQueue.add("Код не полностью указан")
        }
    }

    const handleRepeat = async () => {
        const status = await Client.auth.repeatCodeConfirm(email)
        if (status.error) {
            toastQueue.add("Попробуйте заново!")
        }
    }
    return (
        <form onSubmit={handleSubmit} className={s.verifyCode}>
            <h1>
                Введите код<br/>из письма
            </h1>
            <Input type="number" state={code} dispatch={codeDispatch}/>
            <div className={s.verifyCodeControllers}>
                <div className={s.verifyCodeButtons}>
                    <Button 
                        type={ButtonType.MainColor}   
                    >
                        Продолжить
                    </Button>
                    <Button 
                        type={ButtonType.PrimaryDark} 
                        onClick={handleRepeat}  
                    >
                        Отправить ещё раз
                    </Button>
                </div>
                <p>
                    Код был отправлен на почту: 
                    <Link href={"mailto:" + email}>{email}</Link>
                </p>
            </div>
        </form>
    )
}