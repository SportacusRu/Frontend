import { AvatarProps, AvatarSizes, AvatarSizesList } from "./types";
import Image from "next/image";
import s from "./Avatar.module.css"


export default function({userPhoto, size} : AvatarProps) {
    const sizes = size ? AvatarSizesList[size] : AvatarSizesList[0];
    return <>
    {
        userPhoto ? 
            <img 
                src={userPhoto} style={{width: sizes, height: sizes}} 
                className={s.avatar} alt="Avatar"
            /> 
            : <Image src="/user.svg" width={sizes} height={sizes} alt="Avatar" />
    }
    </>
}