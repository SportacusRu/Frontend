import { Swiper, SwiperSlide } from "swiper/react";
import s from "./filtersSlider.module.css"
import Tag from "../Tag";
import { FiltersSliderProps } from "./types";
import { PLACE_CATEGORIES } from "@/config/config";
import { Mousewheel } from "swiper/modules";


export default function({
    filters, category, reducer, clickedFilters
} : FiltersSliderProps) {

    const setCategory = (category: string) => {
        if (reducer) {
            if (reducer[0].category == category) {
                reducer[1]({type: "SET_CATEGORY", payload: ""})
            } else {
                reducer[1]({type: "SET_CATEGORY", payload: category})
            }
        }
    }

    const toggleFilters = (filterName: string) => {
        if (reducer && reducer[0].filters.includes(filterName)) {
            reducer[1]({ type: "REMOVE_FILTER", payload: filterName })
        } else if (reducer) {
            reducer[1]({ type: "ADD_FILTER", payload: filterName })
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
            reducer ? (clickedFilters ? clickedFilters : PLACE_CATEGORIES).map(
                (item, i) => <SwiperSlide key={i} className={s.slide}>
                    <Tag 
                        active={clickedFilters ? reducer[0].filters.includes(item) : reducer[0].category == item} 
                        onClick={clickedFilters 
                            ? () => toggleFilters(item)
                            : () => setCategory(item) 
                        }
                    >
                        {item}
                    </Tag>
                </SwiperSlide>) : <></>
        }
    </Swiper>
}