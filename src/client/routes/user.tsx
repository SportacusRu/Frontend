import { AxiosResponse } from "axios";
import { ErrorType, User } from "../models/types";
import baseRouter from "./base";


class UserRouter extends baseRouter {
    protected __BASE_URL = "/user"; 

    async get() : Promise<User> {
        const response: AxiosResponse<User> = await this.__client.get(
            this.__BASE_URL + "/get"
        );
        return response.data;
    }

    async updatePhoto(photo: string) : Promise<ErrorType> {
        return await this.post(
            "updatePhoto", {
                photo: photo
            }
        )
    }

    async updateName(name: string) : Promise<ErrorType> {
        return await this.post(
            "updateName", {
                name: name
            }
        )
    }

    async updatePassword() : Promise<ErrorType> {
        return await this.post(
            "updatePassword", {}
        )
    }

    async setNewPassword(
        verify_key: string, password: string
    ) : Promise<ErrorType> {
        return await this.post(
            "setNewPassword", {
                verify_key: verify_key,
                password: password
            }
        )
    }
}

export default UserRouter;