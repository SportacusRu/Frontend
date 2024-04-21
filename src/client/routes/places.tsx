import { AxiosResponse } from "axios";
import { ErrorType, Places } from "../models/types";
import baseRouter from "./base";


class PlacesRouter extends baseRouter {
    protected __BASE_URL = "/places"; 

    async get() : Promise<Places[]> {
        const response: AxiosResponse<Places[]> = await this.__client.get(
            this.__BASE_URL + "/get"
        );
        return response.data;
    }

    async getById(place_id: number) : Promise<Places> {
        const response: AxiosResponse<Places> = await this.__client.get(
            this.__BASE_URL + "/getById", {
            params: {
                place_id: place_id
            }
        });
        return response.data;
    }

    async getRecommended() : Promise<Places> {
        const response: AxiosResponse<Places> = await this.__client.get(
            this.__BASE_URL + "/getRecommendedPlace"
        )
        return response.data
    }

    async add(
        title: string, geo: string, description: string, 
        category: string, filters_list: string[]
    ) : Promise<ErrorType> {
        return await this.post("add", {
            title: title, 
            geo: geo, 
            description: description, 
            category: category, 
            filters_list: filters_list
        })
    }

    async like(place_id: number) : Promise<ErrorType> {
        return await this.post("like", {
            place_id: place_id
        })
    }

    async dislike(place_id: number) : Promise<ErrorType> {
        return await this.post("dislike", {
            place_id: place_id
        })
    }
}

export default PlacesRouter;