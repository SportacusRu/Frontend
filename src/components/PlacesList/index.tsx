"use client";
import { Places } from "@/client/models/types";
import Place from "../Place";
import useUserData from "@/hooks/useUserData";

export default function getPlacesList(
    places : Places[], get_new?: boolean
) {
    const { likedList } = useUserData()
    return places && places.filter(
        (p, i) => {
            if (get_new) {
                return i <= 5 && !likedList.has(p.place_id)
            } else {
                return true
            }
        }
    ).map(place => <Place place={place} />)
}