import axios from "axios";
import AuthRouter from "./routes/auth";

class Client {
    static client = axios.create({
        baseURL: process.env.AXIOS_BASE_URL
    })

    static get auth(): AuthRouter {
        return new AuthRouter(this.client)
    }

    static get complaints(): AuthRouter {
        return new AuthRouter(this.client)
    }

    static get places(): AuthRouter {
        return new AuthRouter(this.client)
    }

    static get user(): AuthRouter {
        return new AuthRouter(this.client)
    }
}
