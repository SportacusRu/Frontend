import { AxiosResponse } from "axios";
import { ErrorType, Reviews } from "../models/types";
import baseRouter from "./base";


class ReviewsRouter extends baseRouter {
    protected __BASE_URL = "/reviews"; 

    async getByPlaceId(place_id: number) : Promise<Reviews[]> {
        const response: AxiosResponse<Reviews[]> = await this.__client.get(
            this.__BASE_URL + "/getByPlaceId", {
            params: {
                place_id: place_id
            }
        });
        return response.data;
    }

    async getByUser(place_id: number) : Promise<Reviews[]> {
        const response: AxiosResponse<Reviews[]> = await this.__client.get(
            this.__BASE_URL + "/getByUser", {
            params: {
                place_id: place_id
            }
        });
        return response.data;
    }

    async add(
        place_id: number, description: string, photos: string[], grade: number
    ) : Promise<ErrorType> {
        return await this.post("add", {
            place_id: place_id,
            description: description,
            photos: photos,
            grade: grade
        })
    }

    async remove(review_id: number) : Promise<ErrorType> {
        return await this.post("remove", {
            review_id: review_id
        })
    }
}

export default ReviewsRouter;