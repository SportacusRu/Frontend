"use client";
import { PlaceProps } from "./types";
import s from "./place.module.scss"
import Image from "next/image";
import Button from "../Button";
import { ButtonType } from "../Button/types";
import { Icons } from "../Icon/types";
import Icon from "../Icon";
import { Colors } from "../color";
import { Subhead, Headline } from "../Typography";
import Stars from "../Stars/Stars";
import { Client } from "@/client";
import { useToastQueue } from "@/shared/ToastQueueProvider";
import { ToastQueue } from "@/extensions/ToastQueue";
import { useState } from "react";

const handleError = (error: boolean, toastQueue: ToastQueue) => {
    if (error) {
        toastQueue.add("Ошибка авторизации! Перезагрузите страницу");
    }
    return error;
}

export default function(props : PlaceProps) {
    const toastQueue = useToastQueue();
    const [likeColor, setLikeColor] = useState(Colors.greyDark);
    const [dislikeColor, setDislikeColor] = useState(Colors.greyDark);

    const onLike = async () => {
        const res = await Client.places.like(props.place_id);
        const error = handleError(res.error, toastQueue);
        if (!error) {
            setLikeColor(Colors.accent);
            setDislikeColor(Colors.greyDark)
        }
        
    }
    const onDislike = async () => {
        const res = await Client.places.dislike(props.place_id);
        const error = handleError(res.error, toastQueue);
        if (!error) {
            setDislikeColor(Colors.accent)
            setLikeColor(Colors.greyDark)
        }
    }
    return (
      <div className={s.place} onClick={props.onClick}>
        <div className={s.placeImage}>
          <Image
            width={382}
            height={220}
            src={props.src}
            loading="lazy"
            alt={props.title}
          />
          {props.recommended ? <Headline>
            рекомендуем
          </Headline> : <></>}
        </div>
        <div className={s.placeContent}>
          <div className={s.placeInfo}>
            <Subhead>{props.title}</Subhead>
            <Stars rating={props.rating} />
          </div>
          <div className={s.placeButtonList}>
            <Button
              type={ButtonType.Icon}
              onClick={onLike}
              icon={<Icon type={Icons.like} color={likeColor} />}
            ></Button>
            <Button
              type={ButtonType.Icon}
              onClick={onDislike}
              icon={<Icon type={Icons.unlike} color={dislikeColor} />}
            ></Button>
          </div>
        </div>
      </div>
    );
}