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


function Map() {
  const [userPosition, setUserPosition] = useState<LngLat>([60.658035, 56.842906]);

  const onLoadHandler = (y: YMapDefaultModules) => {
      y.ymaps.geolocation.getPosition()
      .then(e => {
          if (e.accuracy)
              return setUserPosition(e.coords);
          return;
      })
  }

  const getGeolocatePosition = (position: LngLat) => {
    setUserPosition(position)
  }
  return (
    <YMapComponentsProvider 
        apiKey={"cd30143c-48d9-4f87-8c2b-1a74eada9222"} 
        onLoad={onLoadHandler}   
    >
    <YMap 
      location={{ center: userPosition, zoom: 18}} 
      mode="vector" 
      theme="dark" 
    >
      <YMapDefaultSchemeLayer />
      <YMapDefaultFeaturesLayer />
      <YMapMarker
        coordinates={userPosition}
      >
        <Image src="/user_position.svg" width={20} height={20} alt="user"/>
      </YMapMarker>
      <YMapControls position="right">
        <YMapZoomControl />
        <YMapGeolocationControl onGeolocatePosition={getGeolocatePosition}/>
      </YMapControls>
    </YMap>
    </YMapComponentsProvider>
  );
}

export default Map;