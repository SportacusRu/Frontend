import PlacesMap from "@/components/PlacesMap/PlacesMap";
import { MapScreenProps } from "./types";
import useWidth from "@/hooks/useSize";
import PlaceModal from "../../Modals/Place";
import FiltersModal from "@/components/Modals/Filters";


export default function MapScreen({
    places, currentPlace, setCurrentPlace, setReviews, reviews, setScreen
} : MapScreenProps) {
    const { width } = useWidth()
    return <>
        {width && width <= 430 ? <PlacesMap 
            places={places} 
            currentPlace={currentPlace} 
            setCurrentPlace={setCurrentPlace} 
            setReviews={setReviews} 
        /> : <></>}
        {currentPlace && reviews ? <PlaceModal 
            reviews={reviews} 
            currentPlace={currentPlace} 
            setCurrentPlace={setCurrentPlace} 
            setReviews={setReviews}
            setScreen={setScreen}
        /> : <FiltersModal setScreen={setScreen}/>}
    </>
}
