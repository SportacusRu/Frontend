"use client";

import YandexMap from "../YandexMap";
import { PlacesMapProps } from "./types";
import { YMapMarker } from "ymap3-components";
import { StringToLngLat } from "@/extensions/ymap";
import Image from "next/image";
import s from "./PlacesMap.module.css"
import { useMemo, useState } from "react";

import { Client } from "@/client";
import { useFilters } from "@/shared/FiltersProvider";
import Loader from "../Loader";
import { useCurrentPlace } from "@/shared/CurrentPlaceProvider";


/**
 * Renders a map of places with markers.
 *
 * @param {Places[]} places - Array of places to be marked on the map
 * @param {Place} currentPlace - The current place selected on the map
 * @return {JSX.Element} The Yandex Map component with the list of place markers
 */
export default function PlacesMap({ 
  places,
}: PlacesMapProps): JSX.Element {
  const [loading, setLoading] = useState(false)
  const {currentPlace, currentReviews} = useCurrentPlace()
  const [store, dispatch] = useFilters()

  const filteredPlaces = useMemo(() => {
    if (store.category != "" || store.filters.length > 0) {
      return places.map(p => {
        const filterCheck = p.filters_list.some(f => store.filters.includes(f));
        const categoryCheck = store.category == p.category;
        if (filterCheck || categoryCheck) return p;
      }).filter(p => p !== undefined)
    }
    return places
  }, [store.category, store.filters, places])
  
  const handlePlaceClick = async(placeId: number) => {
    setLoading(true)
    if (filteredPlaces) {
      currentPlace.set(filteredPlaces.find(place => place && place.place_id === placeId))
      currentReviews.set(await Client.reviews.getByPlaceId(placeId));
    }
    setLoading(false)
  }

  const placeMarkers = filteredPlaces.map(place => (
    place &&<YMapMarker
      key={place.place_id}
      coordinates={StringToLngLat(place.geo)}
      onClick={() => handlePlaceClick(place.place_id)}
    >
      <Image src="/place_cursor.svg" alt="Place" width={41} height={67} />
    </YMapMarker>
  ));

  return <div className={s.mapWrapper}>
    <Loader loading={loading}/>
    <YandexMap PlacesList={placeMarkers} currentPlace={currentPlace.value} />;
  </div>
}
