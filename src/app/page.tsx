import { HomeProps } from "./types";
import { Client } from "@/client";
import View from "@/components/View";
import "./page.scss"


export default async function Home({ searchParams }: HomeProps) {
  const places = await Client.places.get();
  const currentPlace = places.findLast(place => place.place_id == searchParams?.place_id);
  return (
    <main>
      <View places={places} />
    </main>
  )
}