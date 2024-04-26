import { Reviews } from "@/client/models/types";
import Review from "../Review";

export default function getReviewsList(reviews : Reviews[], name?: string) {
    return reviews && reviews.map(review => 
        <Review 
            place_id={review.place_id} 
            review_id={review.review_id} 
            rating={review.grade} 
            description={review.description} 
            userName={name ? name : review.user_name} 
            time={review.created_at} 
            viewUserPage={name ? true : false}           
        />
    ) 
}