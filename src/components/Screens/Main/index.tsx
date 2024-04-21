import Image from "next/image";
import s from "./Main.module.scss"
import Place from "@/components/Place";
import Slider from "@/components/Slider";
import { Places } from "@/client/models/types";
import getPlacesList from "@/components/PlacesList";
import Scrollbar from "@/components/Scrollbar";


export default function MainScreen({ places } : { places: Places[] }) {
    const recommendedPlace = places[0];
    return <Scrollbar className={s.main}>
        <Image src={"/logo.svg"} width={152} height={29} alt="logo" className={s.logo}/>
        <div className={s.mainContent}>
            <div className={s.mainRecommended}>
            <Place 
                place_id={recommendedPlace.place_id} 
                src={recommendedPlace.preview} 
                title={recommendedPlace.title} 
                rating={recommendedPlace.rating} 
                liked={false} 
                recommended={true}                        
            />
            </div>
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
}