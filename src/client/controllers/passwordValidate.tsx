import { InputState } from "@/components/Input/types";
import { ToastQueue } from "@/extensions/ToastQueue";
import { Client } from "..";

export default async function setNewPassword(
    verify_key: string, 
    password: InputState, 
    toastQueue: ToastQueue
) : Promise<void> {
    if (password.validateResult && verify_key) {
        const { error } = await Client.user.setNewPassword(verify_key, password.value)
        if (error) toastQueue.add("Ссылка устарела или недействительна");     
    } else {
        toastQueue.add("Пароли не совпадают или не валидны");
    }
};