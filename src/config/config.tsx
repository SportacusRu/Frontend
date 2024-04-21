import { Icons } from "@/components/Icon/types";

const CODE_LENGTH = 4 as const;

const PLACES_FILTERS = [
    "турники", "брусья", "велотренажер", "шагомер",
    "степпер", "маятник", "лыжный тренажер", "твистер", "беговые дорожки", 
    "баскетбольное кольцо", "теннисный стол", "площадка для большого тенниса",
    "футбольные ворота", "хоккейный корт", "жим сидя от груди",
    "жим ногами", "гребля", "сгибание ног", "волейбольная сетка",
    "вертикальная тяга", "гиперэкстензия", "лыжная трасса", "каток"
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