"use client";

import { SliderProps } from "./types";
import s from "./Slider.module.css"
import Link from "../Link";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Mousewheel } from "swiper/modules";


export default function Slider({slides, data, link} : SliderProps) {
    return (
        <div className={s.slider}>
            <div className={s.sliderContent}>
                <div className={s.sliderData}>
                    <h2>{data.title}</h2>
                    {data.description ? <p>{data.description}</p> : <></>}
                </div>
                {link ? 
                    <Link onClick={link.onClick}>{link.title}</Link> 
                    : <></>
                }
            </div>
            <Swiper 
                modules={[Mousewheel]}
                slidesPerView={"auto"}
                className={s.swiper}
                centeredSlidesBounds={true}
                mousewheel={true}
            >
                {slides.map((slide, i) => 
                    <SwiperSlide key={i} className={s.swiperSlide}>
                        {slide}
                    </SwiperSlide>
                )}
            </Swiper>
        </div>
    )
}