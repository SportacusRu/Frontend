import { Swiper, SwiperSlide } from "swiper/react";
import s from "./filtersSlider.module.css"
import Tag from "../Tag";
import { FiltersSliderProps } from "./types";
import { PLACE_CATEGORIES } from "@/config/config";
import { Mousewheel } from "swiper/modules";


export default function({filters, category, reducer} : FiltersSliderProps) {

    const setCategory = (category: string) => {
        if (reducer) {
            if (reducer[0].category == category) {
                reducer[1]({type: "SET_CATEGORY", payload: ""})
            } else {
                reducer[1]({type: "SET_CATEGORY", payload: category})
            }
        }
    }
    return <Swiper 
        className={s.swiper}
        slidesPerView={"auto"}
        spaceBetween={4}
        freeMode={true}
        modules={[Mousewheel]}
        mousewheel={true}
    >
        {category ? <SwiperSlide className={s.slide}>
            <Tag active>{category}</Tag>
        </SwiperSlide> : <></>}
        {
            filters ? filters.map((filter, i) => <SwiperSlide key={i} className={s.slide}>
                <Tag>{filter}</Tag>
            </SwiperSlide>) : <></>
        }
        {
            reducer ? PLACE_CATEGORIES.map(
                (category, i) => <SwiperSlide key={i} className={s.slide}>
                    <Tag 
                        active={reducer[0].category == category} 
                        onClick={() => setCategory(category)}
                    >
                        {category}
                    </Tag>
                </SwiperSlide>) : <></>
        }
    </Swiper>
}