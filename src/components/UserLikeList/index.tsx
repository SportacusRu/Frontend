import Loader from "../Loader";
import { User } from "@/client/models/types";
import Slider from "../Slider";
import getPlacesList from "../PlacesList";

export default function({ user, loading }: {user?: User, loading: boolean }) {
    return <>
        {user?.like_list && user.like_list.length > 0 
            ? <Slider 
                slides={getPlacesList(user.like_list)}
                data={{
                    title: "Понравившиеся"
                }}
            /> : <></>}
            <Loader loading={loading}/>
    </>
}