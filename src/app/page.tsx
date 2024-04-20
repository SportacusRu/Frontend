import Cookie from "@/components/Cookie";
import { HomeProps } from "./types";
import { Client } from "@/client";
import { Toast } from "@/components/Toast";
import ToastFabric from "@/components/ToastFabric";


export default async function Home({ searchParams }: HomeProps) {
  const places = await Client.places.get();
  const currentPlace = places.findLast(place => place.place_id == searchParams?.place_id);
  return (
    <main>
    </main>
  )
}