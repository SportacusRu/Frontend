import { ErrorType } from "../models/types";
import baseRouter from "./base";


class AuthRouter extends baseRouter {
    protected __BASE_URL = "/auth"; 

    async register(name: string, email: string, password: string): Promise<ErrorType> {
        return await this.post("register", {
            name,
            password,
            email,
        }) 
    }

    async login(email: string, password: string): Promise<ErrorType> {
        return await this.post("login", {
            email: email,
            password: password,
        })
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