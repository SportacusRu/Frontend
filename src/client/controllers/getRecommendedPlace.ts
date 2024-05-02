import { ToastQueue } from "@/extensions/ToastQueue"
import { Places } from "../models/types"
import { Client } from ".."

const getRecommendedPlace = (toastQueue: ToastQueue, setRecommendedPlace: (p: Places) => void) => {
    if (Client.authorized) {
        Client.places.getRecommended()
        .then(p => p && setRecommendedPlace(p))
        .catch(() => toastQueue.add(
            "Ошибка авторизации! Попробуйте перезагрузить страницу."
        ))
    }
}

export default getRecommendedPlace;