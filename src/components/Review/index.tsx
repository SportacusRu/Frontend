"use client";
import Avatar from "../Avatar";
import { Icons } from "../Icon/types";
import Menu from "../Menu";
import MenuItem from "../MenuItem";
import Stars from "../Stars/Stars";
import { Caption, Headline, Subhead } from "../Typography";
import { Colors } from "../color";
import { ReviewProps } from "./types";
import s from "./Review.module.scss"
import { Client } from "@/client";
import { useToastQueue } from "@/shared/ToastQueueProvider";
import useUserData from "@/hooks/useUserData";


export default function(props : ReviewProps) {
    const toast = useToastQueue()
    const { update } = useUserData()
    
    const handleDelete = async () => {
        const response = await Client.reviews.remove(props.review_id);
        if (response.error) {
            toast.add("Что-то пошло не так! Перезагрузите страницу")
        } else {
            update()
        }
    }
    return <div className={s.review}>   
        <div className={s.reviewHeader}>
            <div className={s.reviewHeaderContent}>
                <Avatar 
                    upload={Client.user.getPhoto(props.user_id)} 
                 />
                <div>
                    <Subhead>{props.viewUserPage ? "Вы" : props.userName }</Subhead>
                    <Caption>{props.time}</Caption>
                </div>
            </div>
            {Client.authorized ? <Menu>
                {props.viewUserPage ? 
                <>
                    <MenuItem 
                        icon={Icons.arrowCircle} 
                        color={Colors.white}
                        onClick={props.viewPageHandler}
                    >
                        Перейти к месту
                    </MenuItem> 
                    {<MenuItem 
                        icon={Icons.trash} 
                        color={Colors.danger}
                        onClick={handleDelete}
                    >
                    Удалить
                    </MenuItem>}
                </> : <></>
                }
                {!props.viewUserPage ? <MenuItem 
                    icon={Icons.complaints} 
                    color={Colors.danger} 
                    onClick={props.complaintHandler}
                >
                    Пожаловаться
                </MenuItem> : <></>}
            
            </Menu> : <></>}
        </div>
        <div className={s.reviewRating}>
            <Headline>Оценка</Headline>
            <Stars rating={props.rating}/>
        </div>
    
        <p>
            {props.description}
        </p>
    </div>

}