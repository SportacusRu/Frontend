import { BASE_URL } from "@/config/config";

export default function(place_id: number) {
    return BASE_URL + "/?place_id=" + place_id 
}