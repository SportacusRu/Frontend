import Icon from "../Icon"
import { Icons } from "../Icon/types"
import { Colors } from "../color"
import s from "./ImageItem.module.css"
import Image from "next/image"
import { ImageItemProps } from "./types"


export default function({src, onClick}: ImageItemProps) {
    return <div className={s.imageItem}>
        <Image src={src} width={80} height={80} alt="Image"/>
        <div onClick={onClick}>
            <Icon type={Icons.trash} color={Colors.danger}/>
        </div>
    </div> 
}