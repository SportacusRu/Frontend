"use client"
import { LngLat } from "@yandex/ymaps3-types";
import Image from "next/image";
import React, { useState } from "react";
import {
  YMap,
  YMapDefaultSchemeLayer,
  YMapDefaultFeaturesLayer,
  YMapControls,
  YMapGeolocationControl,
  YMapZoomControl,
  YMapMarker,
  YMapComponentsProvider,
} from "ymap3-components";
import { YMapDefaultModules } from "ymap3-components/dist/src/types";
import { YandexMapProps } from "./types";
import { StringToLngLat } from "@/extensions/ymap";

const API_KEY = process.env.NEXT_PUBLIC_YANDEX_MAP_KEY 
                ? process.env.NEXT_PUBLIC_YANDEX_MAP_KEY 
                : "";

function YandexMap({ PlacesList, currentPlace } : YandexMapProps) {
  const [userPosition, setUserPosition] = useState<LngLat>([60.658035, 56.842906])

  const onLoadHandler = (y: YMapDefaultModules) => {
      y.ymaps.geolocation.getPosition()
      .then(e => {
          if (e.accuracy) setUserPosition(e.coords);
      })
  }
  const getGeolocatePosition = (position: LngLat) => setUserPosition(position)
  return (
    <YMapComponentsProvider 
        apiKey={API_KEY} 
        onLoad={onLoadHandler}   
    >
    <YMap 
      location={{ 
        center: currentPlace !== undefined ? StringToLngLat(currentPlace.geo) : userPosition, 
        zoom: 18
      }} 
      mode="vector" 
      theme="dark" 
    >
      <YMapDefaultSchemeLayer />
      <YMapDefaultFeaturesLayer />
      {PlacesList}
      <YMapMarker
        coordinates={userPosition}
      >
        <Image src="/user_position.svg" width={20} height={20} alt="user"/>
      </YMapMarker>
      <YMapControls position="top left">
        <YMapZoomControl />
        <YMapGeolocationControl onGeolocatePosition={getGeolocatePosition}/>
      </YMapControls>
    </YMap>
    </YMapComponentsProvider>
  );
}

export default YandexMap;