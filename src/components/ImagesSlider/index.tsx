import {Swiper, SwiperSlide} from "swiper/react";
import s from "./ImagesSlider.module.css"
import ImageCounter from "../ImageCounter";
import { Mousewheel } from "swiper/modules";
import { useState } from "react";


export default function({images}: {images: string[]}) {
    const [activeIndex, setActiveIndex] = useState(0);
    return <Swiper
        modules={[Mousewheel]}
        slidesPerView={1}
        className={s.swiper}
        centeredSlidesBounds={true}
        mousewheel={true}
        onActiveIndexChange={(i) => setActiveIndex(i.activeIndex)}
    >
        {
        images.map((image, i) => <SwiperSlide key={i}>
            <img src={image} alt="Image" className={s.Image}/>
        </SwiperSlide>)
        }
        <div className={s.сounter}>
            <ImageCounter count={images.length} position={activeIndex+1} />
        </div>
    </Swiper>
}