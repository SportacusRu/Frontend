import { AxiosResponse } from "axios";
import { ErrorType, LoginPost } from "../models/types";
import baseRouter from "./base";


class AuthRouter extends baseRouter {
    protected __BASE_URL = "/auth"; 

    async register(name: string, email: string, password: string): Promise<ErrorType> {
        return await this.post("register", {
            name: name,
            password: password,
            email: email,
        }) 
    }

    async login(email: string, password: string): Promise<void> {
        const data: AxiosResponse<LoginPost> = await this.__client.post(this.__BASE_URL + "/login", {
            username: email,
            password: password,
            grant_type: "password", 
        })
        var now = new Date();
        var time = now.getTime();
        var expireTime = time + 172800000;
        now.setTime(expireTime);
        document.cookie = `access_token=${data.data.access_token};expires=${now.toUTCString()};path=/;SameSite=Lax`
        
    }

    async validateCodeConfirm(code: string, email: string): Promise<ErrorType> {
        return await this.post("validateCodeConfirm", {
            code: code, 
            email: email
        })
    }

    async repeatCodeConfirm(email: string): Promise<ErrorType> {
        return await this.post("repeatCodeConfirm", {
            email: email
        })
    }
}

export default AuthRouter;