"use client";
import s from "./Place.module.scss"
import Button from "@/components/Button";
import { Icons } from "@/components/Icon/types";
import ImagesSlider from "@/components/ImagesSlider";

import Menu from "@/components/Menu";
import MenuItem from "@/components/MenuItem";
import Slider from "@/components/Slider";
import Stars from "@/components/Stars/Stars";
import { Colors } from "@/components/color";
import FiltersSlider from "@/components/filtersSlider";
import { useEffect, useState } from "react";
import { StringToLngLat, getMapLink } from "@/extensions/ymap";
import { ButtonType } from "@/components/Button/types";
import Icon from "@/components/Icon";
import Modal from "..";
import { useUserPosition } from "@/shared/UserPositionProvider";
import Scrollbar from "@/components/Scrollbar";
import useScreen, { PAGES } from "@/hooks/useScreen";
import { useCurrentPlace } from "@/shared/CurrentPlaceProvider";
import Loader from "@/components/Loader";
import getReviewsList from "@/components/ReviewsList";


export default function PlaceModal() {
    const [reviewsPhotos, setReviewsPhotos] = useState<string[]>([]);
    const { position } = useUserPosition()
    const { currentPlace, currentReviews }= useCurrentPlace()
    const [_, setScreen] = useScreen()
    useEffect(() => {
      if (currentReviews.value)
        setReviewsPhotos(currentReviews.value.flatMap(r => r.photos));
    }, [currentReviews.value])

    const handleCancel = () => {
        currentPlace.set(undefined)
        currentReviews.set(undefined)
        setScreen(PAGES.Map)
    }
    const handleCreateMap = () => {
        if (currentPlace.value)
            window.open(
                getMapLink(position, StringToLngLat(currentPlace.value.geo)),
                "_blank"
            );
    }
    return (
      <Modal background={false}>
        {currentPlace.value && currentReviews.value ? (
          <div className={s.placeScreenWrapper}>
            <Scrollbar className={s.scroll}>
              <div className={s.placeScreen}>
                <div className={s.placeScreenHeader}>
                  <header>
                    <Button
                      type={ButtonType.Circle}
                      icon={
                        <Icon type={Icons.arrowLeft} color={Colors.white} />
                      }
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
                  <ImagesSlider images={reviewsPhotos} />
                </div>
                <div className={s.placeScreenFiltersWrapper}>
                  <FiltersSlider
                    filters={currentPlace.value.filters_list}
                    category={currentPlace.value.category}
                  />
                </div>
                <div className={s.placeScreenContent}>
                  <h1 className={s.placeScreenTitle}>{currentPlace.value.title}</h1>
                  <div className={s.placeScreenInfo}>
                    <Stars rating={currentPlace.value.rating} />
                    <div className={s.placeScreenButtons}>
                      <Button
                        type={ButtonType.Icon}
                        icon={
                          <Icon type={Icons.like} color={Colors.greyDark} />
                        }
                      />
                      <Button
                        type={ButtonType.Icon}
                        icon={
                          <Icon type={Icons.unlike} color={Colors.greyDark} />
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className={s.placeScreenButton}>
                  <Button type={ButtonType.MainColor} onClick={handleCreateMap}>
                    Построить маршрут
                  </Button>
                </div>
                <p className={s.placeScreenDescription}>
                  {currentPlace.value.description}
                </p>
                <div className={s.placeScreenReviews}>
                  <Slider
                    slides={getReviewsList(currentReviews.value)}
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
        ) : (
          <Loader loading={true} />
        )}
      </Modal>
    );
}