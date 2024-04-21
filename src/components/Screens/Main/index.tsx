import Image from "next/image";
import s from "./Main.module.scss"
import Place from "@/components/Place";
import { Client } from "@/client";

export default async function MainScreen() {
    const recommendedPlace = await Client.places.getRecommended();
    return (
        <>
            <Image src={"/logo.svg"} width={152} height={29} alt="logo"/>
            <div className={s.mainContent}>
                    <Place 
                        place_id={recommendedPlace.place_id} 
                        src={recommendedPlace.preview} 
                        title={recommendedPlace.title} 
                        rating={recommendedPlace.rating} 
                        liked={false} 
                        recommended={true}                        
                    />

            </div>
        </>
    )
}