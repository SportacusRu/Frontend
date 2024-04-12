import YandexMap from "@/components/YandexMap";
import { HomeProps } from "./types";


export default function Home({ searchParams }: HomeProps) {
    if (searchParams.place_id) {
        const place_id = searchParams.place_id
        if (place_id)     
        {
            //
        }
    }
    return (
        <main>
            <YandexMap />
        </main>
    )
}