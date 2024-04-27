"use client";
import { Client } from "@/client";
import Authentication from "./Authentication";

import s from "./User.module.scss"
import { useEffect, useState } from "react";
import Loader from "@/components/Loader";
import { User } from "@/client/models/types";
import { useToastQueue } from "@/shared/ToastQueueProvider";
import Avatar from "@/components/Avatar";
import { AvatarSizes } from "@/components/Avatar/types";
import MoreLinks from "@/components/MoreLinks";
import MoreLinksItem from "@/components/MoreLinksItem";
import Slider from "@/components/Slider";
import getPlacesList from "@/components/PlacesList";
import getReviewsList from "@/components/ReviewsList";
import Scrollbar from "@/components/Scrollbar";


export default function UserScreen() {
    const toastQueue = useToastQueue()
    const [user, setUser] = useState<User>()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (Client.authorized) {
            Client.user.get()
            .then((u) => setUser(u))
            .catch(() => toastQueue.add("Ошибка соединения! Обновите страницу"))
            .finally(() => setLoading(false))
        }
    }, [])

    return <>
        {Client.authorized ? <Scrollbar className="">
            <div className={s.userScreen}>
                <div className={s.userScreenInfo}>
                    <Avatar size={AvatarSizes.M} userPhoto={user?.photo} />
                    <div>
                        <h1>{user?.name}</h1>
                        <p>{user?.email}</p>
                    </div>
                </div>
                <div className={s.userScreenControllers}>
                    <MoreLinks>
                        <MoreLinksItem>
                            Изменить имя
                        </MoreLinksItem>
                        <MoreLinksItem>
                            Изменить фотографию
                        </MoreLinksItem>
                        <MoreLinksItem>
                            Изменить пароль
                        </MoreLinksItem>
                    </MoreLinks>
                </div>
                {user?.reviews_list && user.reviews_list.length > 0 
                ? <Slider 
                    slides={getReviewsList(user.reviews_list, user.name)}
                    data={{
                        title: "Мои отзывы"
                    }}
                /> : <></>}
                {user?.like_list && user.like_list.length > 0 
                ? <Slider 
                    slides={getPlacesList(user.like_list)}
                    data={{
                        title: "Понравившиеся"
                    }}
                /> : <></>}
                <Loader loading={loading}/>
            </div>
        </Scrollbar>: <Authentication />}
    </>
}