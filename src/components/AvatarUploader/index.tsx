"use client";
import { useId, useState } from "react";
import { AvatarUploaderProps } from "./types";

import s from "./AvatarUpdate.module.scss"
import Avatar from "../Avatar";
import { AvatarSizes } from "../Avatar/types";
import useUserData from "@/hooks/useUserData";
import base64 from "@/extensions/base64";
import { useToastQueue } from "@/shared/ToastQueueProvider";
import { Client } from "@/client";


export default function({onUpload}: AvatarUploaderProps) {
    const inputId = useId()
    const toast = useToastQueue()
    const { userData} = useUserData()
    const [image, setNewImage] = useState<string>()

    const uploadHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && onUpload) {
            const file = await base64(e.target.files[0]) as string
            onUpload(file)
            setNewImage(file)
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
                        userPhoto={image ? image : undefined}
                        upload={Client.user.getPhoto(userData?.user_id)}  
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