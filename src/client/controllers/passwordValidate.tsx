import { InputState } from "@/components/Input/types";
import { ToastQueue } from "@/extensions/ToastQueue";
import { Client } from "..";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export default async function setNewPassword(
    verify_key: string, 
    password: InputState, 
    toastQueue: ToastQueue,
    router: AppRouterInstance
) : Promise<void> {
    if (password.validateResult && verify_key) {
        const { error } = await Client.user.setNewPassword(verify_key, password.value)
        if (error) toastQueue.add("Ссылка устарела или недействительна"); 
        else router.push("/")    
    } else {
        toastQueue.add("Пароли не совпадают или меньше 6 символов");
    }
};