import { Places } from "@/client/models/types";
import PlacesMap from "@/components/PlacesMap/PlacesMap";

export default function({places} : { places: Places[]}) {
    return <PlacesMap places={places} currentPlace={undefined}/>
}