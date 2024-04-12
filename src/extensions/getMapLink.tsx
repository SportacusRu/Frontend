import { LngLat } from "@yandex/ymaps3-types";

export default function getMapLink({ userPosition, toPosition }: { userPosition: LngLat, toPosition: LngLat }) {
    return `https://yandex.ru/maps/?rtext=${userPosition[1]}%2C${userPosition[0]}~${toPosition[1]}%2C${toPosition[0]}&rtt=pd`;
}