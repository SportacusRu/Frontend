import { HomeProps } from "./types";
import { Client } from "@/client";


export default async function Home({ searchParams }: HomeProps) {
    const places = await Client.places.get();
    const currentPlace = places.findLast(place => place.place_id == searchParams?.place_id);
    return (
        <main>

        </main>
    )
}