"use client";
import s from "./Place.module.scss"
import Button from "@/components/Button";
import { Icons } from "@/components/Icon/types";
import ImagesSlider from "@/components/ImagesSlider";

import Menu from "@/components/Menu";
import MenuItem from "@/components/MenuItem";
import Review from "@/components/Review";
import Slider from "@/components/Slider";
import Stars from "@/components/Stars/Stars";
import { Colors } from "@/components/color";
import FiltersSlider from "@/components/filtersSlider";
import { useEffect, useState } from "react";
import { PlaceScreenProps } from "./types";
import { StringToLngLat, getMapLink } from "@/extensions/ymap";
import { LngLat } from "@yandex/ymaps3-types";
import { ButtonType } from "@/components/Button/types";
import Icon from "@/components/Icon";
import Modal from "..";
import { useUserPosition } from "@/shared/UserPositionProvider";
import Scrollbar from "@/components/Scrollbar";


export default function PlaceModal({
    currentPlace, reviews, setCurrentPlace, setReviews, setScreen
} : PlaceScreenProps) {
    const [reviewsPhotos, setReviewsPhotos] = useState<string[]>([]);
    const { position } = useUserPosition()
    useEffect(() => setReviewsPhotos(reviews.flatMap(r => r.photos)), [reviews])

    const handleCancel = () => {
        setCurrentPlace(undefined)
        setReviews(undefined)
        setScreen(1)
    }
    const handleCreateMap = () => {
        const currentPosition = [0, 0] as LngLat;
        window.open(
            getMapLink(position, StringToLngLat(currentPlace.geo)),
            "_blank"
        )
    }
    return (
        <Modal background={false}>
            <div className={s.placeScreenWrapper}>
                <Scrollbar className={s.scroll}>
                    <div className={s.placeScreen}>
                        <div className={s.placeScreenHeader}>
                            <header>
                                <Button 
                                    type={ButtonType.Circle} 
                                    icon={<Icon type={Icons.arrowLeft} color={Colors.white}/>}
                                    onClick={handleCancel}
                                />
                                <Button type={ButtonType.Circle}>
                                    <Menu color={Colors.white}>
                                        <MenuItem icon={Icons.share} color={Colors.white}>
                                            Поделиться
                                        </MenuItem>
                                        <MenuItem icon={Icons.edit} color={Colors.white}>
                                            Оставить отзыв
                                        </MenuItem>
                                        <MenuItem icon={Icons.complaints} color={Colors.danger}>
                                            Пожаловаться
                                        </MenuItem>
                                    </Menu>
                                </Button>
                            </header>
                            <ImagesSlider images={reviewsPhotos}/>
                        </div>
                        <div className={s.placeScreenFiltersWrapper}>
                            <FiltersSlider 
                                filters={currentPlace.filters_list} 
                                category={currentPlace.category} 
                            />
                        </div>
                        <div className={s.placeScreenContent}>
                            <h1 className={s.placeScreenTitle}>{currentPlace.title}</h1>
                            <div className={s.placeScreenInfo}>
                                <Stars rating={currentPlace.rating}/>
                                <div className={s.placeScreenButtons}>
                                    <Button 
                                        type={ButtonType.Icon} 
                                        icon={<Icon type={Icons.like} color={Colors.greyDark}/>}
                                    />
                                    <Button 
                                        type={ButtonType.Icon} 
                                        icon={<Icon type={Icons.unlike} color={Colors.greyDark}/>}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className={s.placeScreenButton}>
                            <Button 
                                type={ButtonType.MainColor}
                                onClick={handleCreateMap}
                            >
                                Построить маршрут
                            </Button>
                        </div>
                        <p className={s.placeScreenDescription}>
                            {currentPlace.description}
                        </p>
                        <div className={s.placeScreenReviews}>
                            <Slider slides={
                                    reviews.map(review => <Review 
                                    place_id={currentPlace.place_id} 
                                    review_id={review.review_id} 
                                    rating={review.grade} 
                                    description={review.description} 
                                    userName={review.user_name} time={review.created_at} viewUserPage={false} />)
                            } 
                            data={{
                                title: "Отзывы",
                            }}    
                            link={{
                                title: "Добавить отзыв",
                            }}            
                            />
                        </div>
                    </div>
                </Scrollbar>
            </div>
        </Modal>
    )
}