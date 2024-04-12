import { ErrorType } from "../models/types";
import baseRouter from "./base";


class ModerateRouter extends baseRouter {
    protected __BASE_URL = "/moderate"; 

    async add(data: string, review_id: string = "", place_id: string = ""): Promise<ErrorType> {
        return await this.post("add", {
            data: data,
            review_id: review_id,
            place_id: place_id
        })
    }
}

export default ModerateRouter;