"use client";
import Input from "@/components/Input";
import ModalWrapper from "../ModalWrapper";

import s from "./CreateReview.module.scss"
import useInputReducer from "@/hooks/useInputReducer";
import NumberList from "@/components/NumberList";
import { useState } from "react";
import ImagesList from "@/components/ImagesList";
import { Caption } from "@/components/Typography";
import Button from "@/components/Button";
import { ButtonType } from "@/components/Button/types";
import { useToastQueue } from "@/shared/ToastQueueProvider";
import { Client } from "@/client";
import { useCurrentPlace } from "@/shared/CurrentPlaceProvider";
import Scrollbar from "@/components/Scrollbar";


export default function({onCancelHandler}: {onCancelHandler: () => void}) {
    const toast = useToastQueue()
    const [description, descriptionDispatch] = useInputReducer();
    const { currentPlace } = useCurrentPlace()
    const [grade, setGrade] = useState(3);
    const [images, setImages] = useState<string[]>([]);

    const createHandler = async () => {
        if (description.validateResult && images.length > 0 && currentPlace.value) {
            const res = await Client.reviews.add(
                currentPlace.value.place_id, description.value, images, grade
            )
            if (res.error) {
                toast.add("Что-то пошло не так! Перезагрузите страницу")
            } else {
                onCancelHandler()
                currentPlace.set(currentPlace.value);
            }
        } else {
            toast.add("Проверьте, что описание более 10 символов и прикреплено хоть одно изображение!")
        }
    }

    return (
        <ModalWrapper onCancelHandler={onCancelHandler} isTransition={true}>
            <div className={s.CreateReviewWrapper}>
                <Scrollbar className="">
                    <div className={s.CreateReview}>
                        <h1>
                            Создание отзыва
                        </h1>
                        <Input 
                            type="text" 
                            rows={4}
                            placeholder="Описание отзыва"
                            state={description} dispatch={descriptionDispatch}
                        />
                        <NumberList 
                            range={[1, 2, 3, 4, 5]} 
                            state={grade} setState={setGrade}
                        />
                        <div className={s.CreateReviewImages}>
                            <ImagesList images={images} setImages={setImages}/>
                            <Caption>
                                Прикрепите не более 3 фотографий
                                <br/>
                                в форматах: PNG, JPG до 5МБ
                            </Caption>
                        </div>
                        <Button type={ButtonType.MainColor} onClick={createHandler}>
                            Создать отзыв
                        </Button>
                    </div>
                </Scrollbar>
            </div>
        </ModalWrapper>
    )
}