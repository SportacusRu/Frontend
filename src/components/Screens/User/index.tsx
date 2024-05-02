"use client";
import { Client } from "@/client";
import Authentication from "./Authentication";

import s from "./User.module.scss"
import Avatar from "@/components/Avatar";
import { AvatarSizes } from "@/components/Avatar/types";
import MoreLinks from "@/components/MoreLinks";
import MoreLinksItem from "@/components/MoreLinksItem";
import Slider from "@/components/Slider";
import getReviewsList from "@/components/ReviewsList";
import Scrollbar from "@/components/Scrollbar";
import UserLikeList from "@/components/UserLikeList";
import useUserData from "@/hooks/useUserData";
import UpdatePassword from "@/components/Modals/UpdatePassword";
import { useState } from "react";
import { UpdateModals } from "./User/types";
import { useToastQueue } from "@/shared/ToastQueueProvider";
import UpdateName from "@/components/Modals/UpdateName";
import UpdatePhoto from "@/components/Modals/UpdatePhoto";

const getModal = (
    modal: UpdateModals | undefined, 
    cancelHandler: () => void
) => {
    switch(modal) {
        case UpdateModals.name:
            return <UpdateName onCancelHandler={cancelHandler}/>;
        case UpdateModals.password:
            return <UpdatePassword onCancelHandler={cancelHandler}/>;
        case UpdateModals.photo:
            return <UpdatePhoto onCancelHandler={cancelHandler} />;
        default: 
            return <></>
    }
  }

export default function UserScreen() {
    const toast = useToastQueue()
    const { userData, loading } = useUserData()
    const [modal, setModal] = useState<UpdateModals>()

    const clickHandler = (m: UpdateModals) => setModal(m);
    const cancelHandler = () => setModal(undefined);

    const updatePasswordHandler = async () => {
        setModal(UpdateModals.password);
        const res = await Client.user.updatePassword();
        if (res.error) 
            toast.add("Что-то пошло не так! Перезагрузите страницу");
    }

    return <>
        {Client.authorized ? <Scrollbar className="">
            <div className={s.userScreen}>
                <div className={s.userScreenInfo}>
                    <Avatar size={AvatarSizes.M} userPhoto={userData?.photo} />
                    <div>
                        <h1>{userData?.name}</h1>
                        <p>{userData?.email}</p>
                    </div>
                </div>
                <div className={s.userScreenControllers}>
                    <MoreLinks>
                        <MoreLinksItem 
                            onClick={() => clickHandler(UpdateModals.name)}
                        >
                            Изменить имя
                        </MoreLinksItem>
                        <MoreLinksItem 
                            onClick={() => clickHandler(UpdateModals.photo)}
                        >
                            Изменить фотографию
                        </MoreLinksItem>
                        <MoreLinksItem onClick={updatePasswordHandler}>
                            Изменить пароль
                        </MoreLinksItem>
                    </MoreLinks>
                </div>
                {userData?.reviews_list && userData.reviews_list.length > 0 
                ? <Slider 
                    slides={getReviewsList(userData.reviews_list, userData.name)}
                    data={{
                        title: "Мои отзывы"
                    }}
                /> : <></>}
                <UserLikeList user={userData} loading={loading} />
            </div>
        </Scrollbar>: <Authentication />}
        {getModal(modal, cancelHandler)}
    </>
}