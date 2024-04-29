import { AxiosResponse } from "axios";
import { AuthKey, ErrorType, LoginPost } from "../models/types";
import baseRouter from "./base";


class AuthRouter extends baseRouter {
    protected __BASE_URL = "/auth"; 

    async register(name: string, email: string, password: string): Promise<AuthKey> {
        const res = await this.client.post(`${this.__BASE_URL}/register`, null, {
            params: {
                name: name,
                password: password,
                email: email,
            }
        })
        return res.data;
    }

    async login(email: string, password: string): Promise<void> {
        const data: AxiosResponse<LoginPost> = await this.__client.post(this.__BASE_URL + "/login", {
            username: email,
            password: password,
            grant_type: "password", 
        })
        const now = new Date();
        const time = now.getTime();
        const expireTime = time + 172800000;
        now.setTime(expireTime);
        const token = `access_token=${data.data.access_token};expires=${now.toUTCString()};path=/;SameSite=Lax`
        document.cookie = token
        
    }

    async validateCodeConfirm(
        code: string, email: string, auth_key: AuthKey
    ): Promise<ErrorType> {
        return await this.post("validateCodeConfirm", {
            code: code, 
            email: email,
            auth_key: auth_key
        })
    }

    async repeatCodeConfirm(email: string): Promise<ErrorType> {
        return await this.post("repeatCodeConfirm", {
            email: email
        })
    }
}

export default AuthRouter;