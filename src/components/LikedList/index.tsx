"use client";
import { Places } from "@/client/models/types";
import Place from "../Place";
import useUserData from "@/hooks/useUserData";

export default function getLikedList(
    places : Places[]
) {
    const { likedList } = useUserData()
    return places && places.filter(
        p => likedList.has(p.place_id)
    ).map(place => <Place place={place} />)
}