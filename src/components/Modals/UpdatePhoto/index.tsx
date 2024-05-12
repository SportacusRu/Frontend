"use client";
import ModalWrapper from "../ModalWrapper";
import Button from "@/components/Button";
import { ButtonType } from "@/components/Button/types";
import { Client } from "@/client";
import { useToastQueue } from "@/shared/ToastQueueProvider";

import s from "./UpdatePhoto.module.scss"
import AvatarUploader from "@/components/AvatarUploader";
import { useState } from "react";
import useUserData from "@/hooks/useUserData";


export default function({onCancelHandler} : UpdateProps) {
    const toast = useToastQueue()
    const { update, setImage } = useUserData()
    const [image, setNewImage] = useState<string>()

    const uploadHandler = async (file: string) => {
        setNewImage(file)
    }

    const updateHandler = async () => {
        if (image) {
            const res = await Client.user.updatePhoto(image)

            if (res.error)
                toast.add("Что-то пошло не так! Перезагрузите страницу")
            else setImage(image)

            onCancelHandler()
        }
    }

    return (
        <ModalWrapper onCancelHandler={onCancelHandler} isTransition={true}>
            <div className={s.UpdatePhoto}>
                <div className={s.UpdatePhotoContent}>
                    <div className={s.UpdatePhotoPhoto}>
                        <h1>
                            Изменение фотографии
                        </h1> 
                        <AvatarUploader onUpload={uploadHandler}/>
                    </div>
                    <p>
                        Прикрепите фотографию 
                        <br/>
                        в форматах: PNG, JPG до 5МБ
                    </p>
                </div>
                <Button type={ButtonType.MainColor} onClick={updateHandler}>
                    Сохранить
                </Button>
            </div>
        </ModalWrapper>
    )
}