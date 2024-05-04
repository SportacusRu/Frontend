import PlacesMap from "@/components/PlacesMap/PlacesMap";
import { MapScreenProps } from "./types";
import useWidth from "@/hooks/useSize";
import PlaceModal from "../../Modals/Place";
import FiltersModal from "@/components/Modals/Filters";
import { useCurrentPlace } from "@/shared/CurrentPlaceProvider";
import CreatePlace from "@/components/Modals/CreatePlace";


export default function MapScreen({
    places, modalCreate, setModalCreate
} : MapScreenProps) {
    const { width } = useWidth()
    const {currentPlace, currentReviews} = useCurrentPlace()
    
    return <>
        {width && width <= 430 ? <PlacesMap 
            places={places} 
        /> : <></>}
        {currentPlace.value && currentReviews.value 
            ? <PlaceModal /> 
            : <FiltersModal />
        }
        {
        modalCreate 
            ? <CreatePlace onCancelHandler={() => setModalCreate(false)}/> 
            : <></>
        }
    </>
}
