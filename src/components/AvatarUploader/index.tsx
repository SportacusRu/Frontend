"use client";
import { useId, useState } from "react";
import { AvatarUploaderProps } from "./types";

import s from "./AvatarUpdate.module.scss"
import Avatar from "../Avatar";
import { AvatarSizes } from "../Avatar/types";
import useUserData from "@/hooks/useUserData";
import base64 from "@/extensions/base64";
import { useToastQueue } from "@/shared/ToastQueueProvider";


export default function({onUpload}: AvatarUploaderProps) {
    const inputId = useId()
    const toast = useToastQueue()
    const { userData } = useUserData()
    const [image, setImage] = useState<string>()

    const uploadHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && onUpload) {
            const file = await base64(e.target.files[0]) as string
            onUpload(file)
            setImage(file)
        } else {
            toast.add("Упс! Проблема с изображением, проверьте, что оно подходит по критериям.")
        }      
    }
    return (
        <div className={s.AvatarUpdateWrapper}>
            <input type="file" accept="image/png, image/jpeg" id={inputId} onChange={uploadHandler} />
            <label htmlFor={inputId} className={s.AvatarUpdate}>
                <div>
                    <Avatar 
                        userPhoto={image ? image : userData?.photo} 
                        size={AvatarSizes.L} 
                    />
                    <div>
                        <p>Изменить</p>
                    </div>
                </div>
            </label>
        </div>
    )
}