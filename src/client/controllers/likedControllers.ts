import { ToastQueue } from "@/extensions/ToastQueue";
import { Client } from "..";
import { Colors } from "@/components/color";
import { likedListData } from "@/shared/UserDataProvider";

const handleError = (error: boolean, toastQueue: ToastQueue) => {
    if (error) {
        toastQueue.add("Ошибка авторизации! Перезагрузите страницу");
    }
    return error;
}

const likeHandler = async (
    toastQueue: ToastQueue,
    likedList: likedListData,
    place_id: number | undefined, 
    setLikeColor: (c: Colors) => void,
    setDislikeColor: (c: Colors) => void,
) => {
    if (place_id) {
        likedList.add(place_id)
        setLikeColor(Colors.accent);
        setDislikeColor(Colors.greyDark)
        const res = await Client.places.like(place_id);
        handleError(res.error, toastQueue);
    }
  }

const dislikeHandler = async (
    toastQueue: ToastQueue,
    likedList: likedListData,
    place_id: number | undefined, 
    setLikeColor: (c: Colors) => void,
    setDislikeColor: (c: Colors) => void,
) => {
    if (place_id) { 
        likedList.pop(place_id)
        setDislikeColor(Colors.accent)
        setLikeColor(Colors.greyDark)
        const res = await Client.places.dislike(place_id);
        handleError(res.error, toastQueue);
    }
}

export {
    likeHandler, dislikeHandler
}