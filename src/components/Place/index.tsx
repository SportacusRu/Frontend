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
import { useToastQueue } from "@/shared/ToastQueueProvider";
import { useState } from "react";
import { useCurrentPlace } from "@/shared/CurrentPlaceProvider";
import useUserData from "@/hooks/useUserData";
import { dislikeHandler, likeHandler } from "@/client/controllers/likedControllers";


export default function(props : PlaceProps) {
    const toastQueue = useToastQueue();
    const { likedList } = useUserData()
    const liked = likedList.has(props.place.place_id)
    const [likeColor, setLikeColor] = useState(
      liked ? Colors.accent : Colors.greyDark
    );
    const [dislikeColor, setDislikeColor] = useState(Colors.greyDark);
    const { currentPlace } = useCurrentPlace()

    const handleClick = async () => currentPlace.set(props.place)

    return (
      <div className={s.place}>
        <div className={s.placeImage} onClick={handleClick}>
          <Image
            width={382}
            height={220}
            src={`https://api.xn--90abjbpy0az.xn--p1ai/places/getPreview?place_id=${props.place.place_id}`}
            loading="lazy"
            alt={props.place.title}
          />
          {props.recommended ? <Headline>
            рекомендуем
          </Headline> : <></>}
        </div>
        <div className={s.placeContent}>
          <div className={s.placeInfo}>
            <Subhead>{props.place.title}</Subhead>
            <Stars rating={props.place.rating} />
          </div>
          <div className={s.placeButtonList}>
            <Button
              type={ButtonType.Icon}
              onClick={() => likeHandler(
                toastQueue, likedList, props.place.place_id,
                setLikeColor, setDislikeColor
              )}
              icon={<Icon type={Icons.like} color={likeColor} />}
            ></Button>
            <Button
              type={ButtonType.Icon}
              onClick={() => dislikeHandler(
                toastQueue, likedList, props.place.place_id,
                setLikeColor, setDislikeColor
              )}
              icon={<Icon type={Icons.unlike} color={dislikeColor} />}
            ></Button>
          </div>
        </div>
      </div>
    );
}