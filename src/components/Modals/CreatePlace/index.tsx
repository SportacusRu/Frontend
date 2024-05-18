"use client";
import Scrollbar from "@/components/Scrollbar";
import ModalWrapper from "../ModalWrapper";
import Input from "@/components/Input";
import useInputReducer from "@/hooks/useInputReducer";
import { SetStateAction, useReducer, useState } from "react";

import s from "./CreatePlace.module.scss"
import { Caption, Headline } from "@/components/Typography";
import FiltersSlider from "@/components/filtersSlider";
import NumberList from "@/components/NumberList";
import ImageUploader from "@/components/ImageUploader";
import Button from "@/components/Button";
import { ButtonType } from "@/components/Button/types";
import { useFilters } from "@/shared/FiltersProvider";
import { PLACES_FILTERS } from "@/config/config";
import { Client } from "@/client";
import { useUserPosition } from "@/shared/UserPositionProvider";
import { useToastQueue } from "@/shared/ToastQueueProvider";
import ImagesList from "@/components/ImagesList";
import { useCurrentPlace } from "@/shared/CurrentPlaceProvider";
import Loader from "@/components/Loader";
import useUserData from "@/hooks/useUserData";
import formatDate from "@/extensions/formatData";


export default function({onCancelHandler} : {onCancelHandler: () => void}) {
    const [title, titleDispatcher] = useInputReducer()
    const toast = useToastQueue()
    const {currentPlace, currentReviews} = useCurrentPlace()
    const {userData} = useUserData()
    const geo = useUserPosition()
    const [description, descriptionDispatcher] = useInputReducer()
    const [grade, setGrade] = useState(3);
    const [storeFilters, dispatchFilters] = useFilters();
    const [files, setFiles] = useState<string[]>([])
    const [loading, setLoading] = useState(false)

    const handleClick = async () => {
        if (title.validateResult 
            && description.validateResult
            && files.length > 0
            && storeFilters.category.length > 0
            && storeFilters.filters.length > 0
        ) {
            setLoading(true)
            const placeId = await Client.places.add(
                title.value, geo.position.toReversed().join(" "), description.value,
                storeFilters.category, storeFilters.filters
            )
            if (!Number.isFinite(placeId)) {
                toast.add("Место не загрузилось! Проверьте корректность данных")
            } else {
                if (userData) {
                    currentPlace.set({
                        place_id: placeId,
                        user_id: userData.user_id,
                        rating: grade,
                        title: title.value,
                        geo: geo.position.toReversed().join(" "),
                        description: description.value,
                        reviews_list: [],
                        category: storeFilters.category,
                        filters_list: storeFilters.filters,
                    });
                    currentReviews.set([
                        {
                            user_id: userData.user_id,
                            review_id: await Client.reviews.getNewId(),
                            place_id: placeId,
                            description: description.value,
                            photos: files,
                            grade: grade,
                            user_photo: "",
                            user_name: userData.name,
                            created_at: formatDate(Date.now())
                        }
                    ])
                    onCancelHandler()
                    await Client.reviews.add(
                        placeId, description.value, files, grade
                    )
                } else {
                    toast.add("Место не загрузилось! Перезагрузите страницу") 
                }
            }
        } else {
            toast.add("Проверьте, что все данные введены верно и прикреплено хоть одно изображение!")
        }
        setLoading(false)
    }
    return (
        <ModalWrapper onCancelHandler={onCancelHandler} isTransition={true}>
            {loading ? <Loader loading={loading} /> : <></>}
            <div className={s.createPlaceWrapper}>
            <Scrollbar className="">
                <div className={s.createPlace}>
                    <h1>Создание места</h1>
                    <div className={s.createPlaceControllers}>
                        <div className={s.createPlaceInput}>
                            <Input 
                                type="text" placeholder="Название места"
                                state={title} dispatch={titleDispatcher}
                            />
                            <Caption>
                                Название не менее 4 и не более 20 символов
                            </Caption>
                        </div>
                        <div className={s.createPlaceInput}>
                            <Input 
                                type="text" placeholder="Описание места" rows={4}
                                state={description} dispatch={descriptionDispatcher}
                            />
                            <Caption>
                                Описание не менее 10 и не более 50 символов
                            </Caption>
                        </div>
                        <div className={s.createPlaceSelect}>
                            <Headline>Выберите категории</Headline>
                            <FiltersSlider 
                                reducer={[storeFilters, dispatchFilters]}
                            />
                        </div>
                        <div className={s.createPlaceSelect}>
                            <Headline>Выберите фильтры</Headline>
                            <FiltersSlider 
                                reducer={[storeFilters, dispatchFilters]} 
                                clickedFilters={PLACES_FILTERS} 
                            />
                        </div>
                        <div className={s.createPlaceNumberList}>
                            <NumberList 
                                range={[1, 2, 3, 4, 5]} 
                                state={grade} setState={setGrade}
                            />
                            <Caption>Укажите оценку оборудования</Caption>
                        </div>
                    </div>
                    <div className={s.createPlaceUploader}>
                        <ImagesList images={files} setImages={setFiles} />
                        <Caption>
                            Прикрепите не более 3 фотографий 
                            <br/>
                            в форматах: PNG, JPG до 5МБ
                        </Caption>
                    </div>
                    <div className={s.createPlaceButtons}>
                        <Button 
                            type={ButtonType.MainColor}
                            onClick={handleClick}
                        >
                            Создать место
                        </Button>
                        <Caption>
                            Мы используем ваше местоположение
                            <br/>
                            при создание места
                        </Caption>
                    </div>
                </div>
            </Scrollbar>
            </div>
        </ModalWrapper>
    )
}