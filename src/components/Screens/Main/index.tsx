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
import UserLikeList from "@/components/UserLikeList";
import useUserData from "@/hooks/useUserData";
import getRecommendedPlace from "@/client/controllers/getRecommendedPlace";


export default function MainScreen({ places } : MainScreenProps) {
    const toastQueue = useToastQueue()
    const newPlaces = getPlacesList(places, true)
    const [recommendedPlace, setRecommendedPlace] = useState<Places>()
    const { loading } = useUserData()
 
    useEffect(() => {  
        getRecommendedPlace(toastQueue, setRecommendedPlace)  
    }, [Client.authorized, recommendedPlace])

    const handleDislikeRecommended = () => {
        getRecommendedPlace(toastQueue, setRecommendedPlace)  
    }
    return (
        <Scrollbar className={s.main}>
            <Image 
                src={"/logo.svg"} width={152} height={29} 
                alt="logo" className={s.logo} 
            />
            <div className={s.mainContent}>
                {recommendedPlace && <div className={s.mainRecommended}>
                    <Place 
                        place={recommendedPlace}
                        recommended={true}      
                        handleDislike={handleDislikeRecommended}                  
                    /> 
                </div>}
                {newPlaces.length > 0 ? <Slider 
                    slides={newPlaces} 
                    data={{
                        title: "Новые места",
                        description: "Посетите новые места"
                    }} 
                /> : <></>}
                <UserLikeList places={places} loading={loading} />
            </div>
        </Scrollbar>
    )
}