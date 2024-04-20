import { AvatarProps } from "./types";
import Image from "next/image";
import s from "./Avatar.module.css"


export default function({userPhoto} : AvatarProps) {
    return <>
    {
        userPhoto ? 
            <img src={userPhoto} className={s.avatar} alt="Avatar"/> 
            : <Image src="/user.svg" width={36} height={36} alt="Avatar" />
    }
    </>
}