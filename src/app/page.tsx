import { HomeProps } from "./types";
import { Client } from "@/client";
import View from "@/components/View";
import "./page.scss"
import getCurrentPlace from "@/client/controllers/getCurrentPlace";


export default async function Home({ searchParams }: HomeProps) {
  const places = await Client.places.get();
  const [currentPlace, reviews] = await getCurrentPlace(searchParams?.place_id);
  
  return (
    <main>
      <View places={places} reviews={reviews} currentPlace={currentPlace}/>
    </main>
  )
}