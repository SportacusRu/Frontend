import Loader from "../Loader";
import { Places } from "@/client/models/types";
import Slider from "../Slider";
import getLikedList from "../LikedList";

export default function({ places, loading }: {places: Places[], loading: boolean }) {
    return <>
        {places && places.length > 0 
            ? <Slider 
                slides={getLikedList(places)}
                data={{
                    title: "Понравившиеся"
                }}
            /> : <></>}
            <Loader loading={loading}/>
    </>
}