"use client";
import { useId } from "react";
import Icon from "../Icon";
import { Icons } from "../Icon/types";
import { Colors } from "../color";
import { ImageUploaderProps } from "./types";
import { minimization } from "@/extensions/minimization";

export default function({onUpload}: ImageUploaderProps) {
    const inputId = useId()
    const uploadHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && onUpload) 
        {
            var minimizedImage = await minimization(e.target.files[0], {
                quality: 0.5,
                type: "image/png"
            })
            if (minimizedImage) onUpload(minimizedImage)
        }
    }
    return (
        <div className="imageUploaderWrapper">
            <input type="file" accept="image/png, image/jpeg" id={inputId} onChange={uploadHandler} />
            <label htmlFor={inputId} className="imageUploader">
                <div>
                    <Icon type={Icons.add} color={Colors.greyLight}/>
                </div>
            </label>
        </div>
    )
}