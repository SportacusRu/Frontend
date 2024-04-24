"use client";

import YandexMap from "../YandexMap";
import { PlacesMapProps } from "./types";
import { YMapMarker } from "ymap3-components";
import { StringToLngLat } from "@/extensions/ymap";
import Image from "next/image";
import s from "./PlacesMap.module.css"
import { useState } from "react";
import { ClipLoader } from "react-spinners";
import { Colors, colorsList } from "../color";
import { Client } from "@/client";


const accentColor = colorsList[Colors.accent];

/**
 * Renders a map of places with markers.
 *
 * @param {Places[]} places - Array of places to be marked on the map
 * @param {Place} currentPlace - The current place selected on the map
 * @return {JSX.Element} The Yandex Map component with the list of place markers
 */
export default function PlacesMap({ 
  places, currentPlace, setCurrentPlace, setReviews
}: PlacesMapProps) {
  const [loading, setLoading] = useState(false)
  
  const handlePlaceClick = async(placeId: number) => {
    setLoading(true)
    setCurrentPlace(places.find(place => place.place_id === placeId))
    setReviews(await Client.reviews.getByPlaceId(placeId));
    setLoading(false)
  }

  const placeMarkers = places.map(place => (
    <YMapMarker
      key={place.place_id}
      coordinates={StringToLngLat(place.geo)}
      onClick={() => handlePlaceClick(place.place_id)}
    >
      <Image src="/place_cursor.svg" alt="Place" width={41} height={67} />
    </YMapMarker>
  ));

  return <div className={s.mapWrapper}>
    {
      loading ? <div className={s.loader}>
        <ClipLoader loading={loading} color={accentColor}/>
      </div> : <></>
    }
    <YandexMap PlacesList={placeMarkers} currentPlace={currentPlace} />;
  </div>
}
