"use client";

import { Places } from "@/client/models/types";
import YandexMap from "../YandexMap";
import { PlacesMapProps } from "./types";
import { useEffect, useState } from "react";
import { YMapMarker } from "ymap3-components";
import { StringToLngLat } from "@/extensions/ymap";
import Image from "next/image";
import { useRouter } from "next/navigation"

/**
 * Renders a map of places with markers.
 *
 * @param {Places[]} places - Array of places to be marked on the map
 * @param {Place} currentPlace - The current place selected on the map
 * @return {JSX.Element} The Yandex Map component with the list of place markers
 */
export default function PlacesMap({ places, currentPlace }: PlacesMapProps) {
  const router = useRouter();

  const handlePlaceClick = (placeId: number) => router.push(`/?place_id=${placeId}`);

  const placeMarkers = places.map(place => (
    <YMapMarker
      key={place.place_id}
      coordinates={StringToLngLat(place.geo)}
      onClick={() => handlePlaceClick(place.place_id)}
    >
      <Image src="/place_cursor.svg" alt="Place" width={41} height={67} />
    </YMapMarker>
  ));

  return <YandexMap PlacesList={placeMarkers} currentPlace={currentPlace} />;
}
