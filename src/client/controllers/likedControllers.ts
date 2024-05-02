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
    place_id: number, 
    setLikeColor: (c: Colors) => void,
    setDislikeColor: (c: Colors) => void,
) => {
    const res = await Client.places.like(place_id);
    const error = handleError(res.error, toastQueue);
    if (!error) {
      setLikeColor(Colors.accent);
      likedList.add(place_id)
      setDislikeColor(Colors.greyDark)
    }
  }

const dislikeHandler = async (
    toastQueue: ToastQueue,
    likedList: likedListData,
    place_id: number, 
    setLikeColor: (c: Colors) => void,
    setDislikeColor: (c: Colors) => void,
) => {
    const res = await Client.places.dislike(place_id);
    const error = handleError(res.error, toastQueue);
    if (!error) {
        setDislikeColor(Colors.accent)
        likedList.pop(place_id)
        setLikeColor(Colors.greyDark)
    }
}

export {
    likeHandler, dislikeHandler
}