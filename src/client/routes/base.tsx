import { AxiosInstance } from "axios";
import { ErrorType } from "../models/types";


export default class baseRouter {
    protected __client: AxiosInstance;
    protected __BASE_URL: any;

    constructor(protected client: AxiosInstance) {
        this.__client = client;
    }

    protected async post(url: string, data: object) : Promise<ErrorType> {
        try {
            await this.__client.post(`${this.__BASE_URL}/${url}`, null, {
                params: data
            });
            return { error: false };
        } catch (error) {
            return { error: true };
        }
    }
}
