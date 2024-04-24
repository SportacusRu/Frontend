import { LngLat } from "@yandex/ymaps3-types";

export function getMapLink(userPosition: LngLat, toPosition: LngLat) {
    return `https://yandex.ru/maps/?rtext=${userPosition[1]}%2C${userPosition[0]}~${toPosition[1]}%2C${toPosition[0]}&rtt=pd`;
}

export function StringToLngLat(str: string) : LngLat {
    const arr = str.split(" ");
    return [Number(arr[1]), Number(arr[0])];
}
