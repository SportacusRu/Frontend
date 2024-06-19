"use client";
import { useId, useState } from "react";
import Icon from "../Icon";
import { Icons } from "../Icon/types";
import { Colors } from "../color";
import { ImageUploaderProps } from "./types";
import { minimization } from "@/extensions/minimization";
import Loader from "../Loader";

export default function({onUpload}: ImageUploaderProps) {
    const inputId = useId()
    const [loading, setLoading] = useState(false);
    const uploadHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && onUpload) 
        {
            setLoading(true)
            var minimizedImage = await minimization(e.target.files[0], {
                quality: 0.5,
                type: "image/png"
            })
            if (minimizedImage) 
                onUpload(minimizedImage);
            setLoading(false);
        }
    }
    return (
        <div className="imageUploaderWrapper">
            <input type="file" accept="image/png, image/jpeg" id={inputId} onChange={uploadHandler} />
            <label htmlFor={inputId} className="imageUploader">
                <div>
                    <Loader loading={loading} />
                    <Icon type={Icons.add} color={Colors.greyLight}/>
                </div>
            </label>
        </div>
    )
}