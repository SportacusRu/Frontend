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
import { useUserPosition } from "@/shared/UserPositionProvider";


const API_KEY = process.env.NEXT_PUBLIC_YANDEX_MAP_KEY 
                ? process.env.NEXT_PUBLIC_YANDEX_MAP_KEY 
                : "";

function YandexMap({ PlacesList, currentPlace } : YandexMapProps) {
  const { position, setPosition } = useUserPosition()


  const onLoadHandler = (y: YMapDefaultModules) => {
      y.ymaps.geolocation.getPosition()
      .then(e => {
          if (e.accuracy) setPosition(e.coords);
      })
  }
  const getGeolocatePosition = (position: LngLat) => setPosition(position)
  return (
    <YMapComponentsProvider 
        apiKey={API_KEY} 
        onLoad={onLoadHandler}   
    >
    <YMap 
      location={{ 
        center: currentPlace !== undefined ? StringToLngLat(currentPlace.geo) : position, 
        zoom: 18
      }} 
      mode="vector" 
      theme="dark" 
    >
      <YMapDefaultSchemeLayer />
      <YMapDefaultFeaturesLayer />
      {PlacesList}
      <YMapMarker
        coordinates={position}
      >
        <Image src="/user_position.svg" width={20} height={20} alt="user"/>
      </YMapMarker>
      <YMapControls position="top left">
        <YMapZoomControl />
        <YMapGeolocationControl onGeolocatePosition={getGeolocatePosition}/>
      </YMapControls>
      <YMapControls position="top right">
        
      </YMapControls>
    </YMap>
    </YMapComponentsProvider>
  );
}

export default YandexMap;