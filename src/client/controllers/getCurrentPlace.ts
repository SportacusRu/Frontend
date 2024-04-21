import { Client } from "..";

export default async function getCurrentPlace(place_id: number | undefined) {
    if (place_id !== undefined) {
      const currentPlaceData = Client.places.getById(place_id)
      const reviewsData = Client.reviews.getByPlaceId(place_id);
      return await Promise.all([currentPlaceData, reviewsData])
    } else {
      return [undefined, undefined]
    }
  }
  