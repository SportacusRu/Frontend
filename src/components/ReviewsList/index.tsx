import { Places, Reviews } from "@/client/models/types";
import Review from "../Review";
import { useCurrentPlace } from "@/shared/CurrentPlaceProvider";

export default function getReviewsList(
    reviews: Reviews[],  name?: string, 
    setComplaintReview?: (review_id: number) => void,
    places?: Places[]
) {
    const {currentPlace} = useCurrentPlace()
    return reviews && reviews.map(review => 
        <Review 
            place_id={review.place_id} 
            review_id={review.review_id} 
            rating={review.grade} 
            description={review.description} 
            userName={name ? name : review.user_name} 
            time={review.created_at} 
            viewUserPage={name ? true : false}        
            complaintHandler={setComplaintReview ? () => setComplaintReview(review.review_id) : undefined}
            viewPageHandler={
                places 
                ? () => currentPlace.set(
                    places.find(place => place && place.place_id === review.place_id)
                ) : undefined} 
        />
    ) 
}