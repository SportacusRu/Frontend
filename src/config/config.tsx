import { Icons } from "@/components/Icon/types";

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
        icon: Icons.home
    },
    {
        title: "Карта",
        icon: Icons.radar
    },
    {
        title: "Профиль",
        icon: Icons.profile
    },
] as const;

export { 
    CODE_LENGTH, PLACES_FILTERS, PLACE_CATEGORIES, 
    COOKIE_DATA, NAVBAR_PAGES 
};