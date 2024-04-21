"use client";
import ImageItem from "../ImageItem";
import ImageUploader from "../ImageUploader";
import { ImagesListProps } from "./types";

import s from "./ImagesList.module.css"
import base64 from "@/extensions/base64";


export default function({images, setImages} : ImagesListProps) {
    const onUpload = async (file: File) => {
        const fileToBase = await base64(file) as string;
        if (fileToBase !== null) setImages([...images, fileToBase])
    }

    return (
        <div className={s.imagesList}>
        {
            images.map((image, i) => <ImageItem 
                key={i} 
                src={image} 
                onClick={() => setImages(images.filter((_, index) => index != i))}
            />)
        }
        {
            images.length < 3 ? <ImageUploader onUpload={onUpload}/> : null
        }
        </div>
    )
}