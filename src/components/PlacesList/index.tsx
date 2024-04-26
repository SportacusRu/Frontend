import { Places } from "@/client/models/types";
import Place from "../Place";

export default function getPlacesList(places : Places[]) {
    return places && places.map(place => 
        <Place 
            place_id={place.place_id} 
            src={place.preview} 
            title={place.title} 
            rating={place.rating} 
            liked={false} 
            recommended={false} 
        />
    ) 
}