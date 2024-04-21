"use client";
import { Client } from "@/client";
import { Places, Reviews } from "@/client/models/types";
import Button from "@/components/Button";
import { ButtonType } from "@/components/Button/types";
import Icon from "@/components/Icon";
import { Icons } from "@/components/Icon/types";
import ImageCounter from "@/components/ImageCounter";
import Menu from "@/components/Menu";
import MenuItem from "@/components/MenuItem";
import Review from "@/components/Review";
import Slider from "@/components/Slider";
import Stars from "@/components/Stars/Stars";
import { Colors } from "@/components/color";

export default function PlaceScreen({currentPlace, reviews} : {currentPlace: Places, reviews: Reviews[]}) {
    return (
        <div>
            <div>
                <header>
                    <Button type={ButtonType.Circle} icon={<Icon type={Icons.arrowLeft} color={Colors.white}/>}/>
                    <Button type={ButtonType.Circle}>
                        <Menu color={Colors.white}>
                            <MenuItem icon={Icons.share} color={Colors.white}>
                                Поделиться
                            </MenuItem>
                            <MenuItem icon={Icons.edit} color={Colors.white}>
                                Оставить отзыв
                            </MenuItem>
                            <MenuItem icon={Icons.complaints} color={Colors.white}>
                                Пожаловаться
                            </MenuItem>
                        </Menu>
                    </Button>
                </header>
                <ImageCounter count={0} position={0} />
            </div>

            <h1>{currentPlace.title}</h1>
            <div>
                <Stars rating={currentPlace.rating}/>
                <div>
                    <Button type={ButtonType.Circle} icon={Icons.like}/>
                    <Button type={ButtonType.Circle} icon={Icons.unlike}/>
                </div>
            </div>
            <Button type={ButtonType.MainColor}>
                Построить маршрут
            </Button>
            <p>
                {currentPlace.description}
            </p>
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
    )
}