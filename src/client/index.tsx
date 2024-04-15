import axios from "axios";
import AuthRouter from "./routes/auth";
import ModerateRouter from "./routes/moderate";
import PlacesRouter from "./routes/places";
import UserRouter from "./routes/user";
import ReviewsRouter from "./routes/reviews";

export class Client {
    static client = axios.create({
        baseURL: process.env.NEXT_PUBLIC_AXIOS_BASE_URL,
        headers: {
            'content-type': 'application/x-www-form-urlencoded'
        },
        withCredentials: true
    })

    static get auth(): AuthRouter {
        return new AuthRouter(this.client)
    }

    static get complaints(): ModerateRouter {
        return new ModerateRouter(this.client)
    }

    static get reviews(): ReviewsRouter {
        return new ReviewsRouter(this.client)
    }

    static get places(): PlacesRouter {
        return new PlacesRouter(this.client)
    }

    static get user(): UserRouter {
        return new UserRouter(this.client)
    }

    static get authorized(): boolean {
        const token = document.cookie.split(";").find(s => s.startsWith("access_token="))?.substring(13);
        if (token !== undefined) {
            this.client.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
        return this.client.defaults.headers.common['Authorization'] !== undefined && token !== undefined;
    } 
}
