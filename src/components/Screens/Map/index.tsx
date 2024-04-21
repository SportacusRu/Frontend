import { Places } from "@/client/models/types";
import PlacesMap from "@/components/PlacesMap/PlacesMap";
import PlaceScreen from "../Place";

export default function({places, currentPlace} : { places: Places[], currentPlace?: Places }) {
    return <PlacesMap places={places} currentPlace={undefined} />
}