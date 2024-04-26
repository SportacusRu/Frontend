import { HomeProps } from "./types";
import { Client } from "@/client";
import View from "@/components/View";
import "./page.scss"
import getCurrentPlace from "@/client/controllers/getCurrentPlace";
import Providers from "@/components/Providers";


export default async function Home({ searchParams }: HomeProps) {
  const places = await Client.places.get();
  const [currentPlace, reviews] = await getCurrentPlace(searchParams?.place_id);
  
  return (
    <Providers>
      <main>
        <View places={places} reviews={reviews} currentPlace={currentPlace}/>
      </main>
    </Providers>
  )
}