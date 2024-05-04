import { Places } from "@/client/models/types";
import { Icons } from "@/components/Icon/types";
import MainScreen from "@/components/Screens/Main";
import { MainScreenProps } from "@/components/Screens/Main/types";
import MapScreen from "@/components/Screens/Map";
import { MapScreenProps } from "@/components/Screens/Map/types";
import UserScreen from "@/components/Screens/User";

const BASE_URL = "https://localhost:3000";
const CODE_LENGTH = 4 as const;

const PLACES_FILTERS = [
    "лыжная трасса", "беговые дорожки", "турники", "баскетбольное кольцо", 
    "лыжный тренажер", "каток", "футбольные ворота", "волейбольная сетка",
    "хоккейный корт", "брусья", "гиперэкстензия", "сгибание ног", "жим ногами",
    "шагомер", "маятник", "жим сидя от груди", "гребля", "степпер", "теннисный стол",
    "площадка для большого тенниса", "велотренажер", "твистер", "вертикальная тяга", 
] as const;

const PLACE_CATEGORIES = [
    "уличные тренажеры", "спортивные игры",
    "воркаут", "бег", "зимние виды спорта",
] as const;

const COOKIE_DATA = {
    title: "Мы используем файлы cookie",
    text: "Для хранения информации о посещение нашего сайта и отслеживаем местоположение для работы карты."
}

const NAVBAR_PAGES = [
    {
        title: "Гланая",
        icon: Icons.home,
        component: (props : MainScreenProps) => <MainScreen {...props} />
    },
    {
        title: "Карта",
        icon: Icons.radar, 
        component: (props : MapScreenProps) => <MapScreen {...props} />
    },
    {
        title: "Профиль",
        icon: Icons.profile, 
        component: (props : {places: Places[]}) => <UserScreen {...props}/>
    },
] as const;

const EXPIRE_ADD_DAYS = 2

export { 
    CODE_LENGTH, PLACES_FILTERS, PLACE_CATEGORIES, 
    COOKIE_DATA, NAVBAR_PAGES, EXPIRE_ADD_DAYS,
    BASE_URL
}