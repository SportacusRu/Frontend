import Place from "@/components/Place";
import { HomeProps } from "./types";
import { Client } from "@/client";
import Review from "@/components/Review";


export default async function Home({ searchParams }: HomeProps) {
  const places = await Client.places.get();
  const currentPlace = places.findLast(place => place.place_id == searchParams?.place_id);
  return (
    <main>
      <Review 
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed rutrum sed metus sed venenatis."
        place_id={0} 
        review_id={0} 
        rating={3} 
        userName={"имя пользователя"} 
        time={"20.04.2005"} 
        viewUserPage={true} />
    </main>
  )
}