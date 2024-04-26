import { Reviews } from "@/client/models/types";
import Review from "../Review";

export default function getReviewsList(places : Reviews[], name: string) {
    return places && places.map(review => 
        <Review 
            place_id={review.place_id} 
            review_id={review.review_id} 
            rating={review.grade} 
            description={review.description} 
            userName={name} 
            time={review.created_at} 
            viewUserPage={true}           
        />
    ) 
}