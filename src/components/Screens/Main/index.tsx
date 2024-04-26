"use client"
import Image from "next/image";
import s from "./Main.module.scss"
import Place from "@/components/Place";
import Slider from "@/components/Slider";
import getPlacesList from "@/components/PlacesList";
import Scrollbar from "@/components/Scrollbar";
import { MainScreenProps } from "./types";
import { useEffect, useState } from "react";
import { Places } from "@/client/models/types";
import { Client } from "@/client";
import { useToastQueue } from "@/shared/ToastQueueProvider";


export default function MainScreen({ places } : MainScreenProps) {
    const toastQueue = useToastQueue()
    const [recommendedPlace, setRecommendedPlace] = useState<Places>()

    useEffect(() => {
        if (Client.authorized) {
            Client.places.getRecommended()
            .then(p => p && setRecommendedPlace(p))
            .catch(() => toastQueue.add(
                "Ошибка авторизации! Попробуйте перезагрузить страницу."
            ))
        }
    }, [places, Client.authorized])
    return (
        <Scrollbar className={s.main}>
            <Image 
                src={"/logo.svg"} width={152} height={29} 
                alt="logo" className={s.logo} 
            />
            <div className={s.mainContent}>
                {recommendedPlace && <div className={s.mainRecommended}>
                    <Place 
                        place_id={recommendedPlace.place_id} 
                        src={recommendedPlace.preview} 
                        title={recommendedPlace.title} 
                        rating={recommendedPlace.rating} 
                        liked={false} 
                        recommended={true}                        
                    /> 
                </div>}
                <Slider 
                    slides={getPlacesList(places)} 
                    data={{
                        title: "Новые места",
                        description: "Посетите новые места"
                    }} 
                />
                <Slider 
                    slides={getPlacesList(places)} 
                    data={{
                        title: "Новые места",
                        description: "Посетите новые места"
                    }} 
                />
            </div>
        </Scrollbar>
    )
}