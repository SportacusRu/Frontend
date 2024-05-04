import Button from "@/components/Button"
import { ButtonType } from "@/components/Button/types"
import Input from "@/components/Input"
import MoreLinks from "@/components/MoreLinks"
import MoreLinksItem from "@/components/MoreLinksItem"
import useInputReducer from "@/hooks/useInputReducer"
import { useState } from "react"
import { CreateComplaintsTexts, CreateComplaintsType, StagesCreateComplaints } from "./types"
import { Client } from "@/client"
import ModalWrapper from "../ModalWrapper"

import s from "./CreateComplaints.module.scss"
import { useToastQueue } from "@/shared/ToastQueueProvider"


export default function({type, place_id, review_id, onCancelHandler}: {
    type: CreateComplaintsType, place_id?: number, review_id?: number, 
    onCancelHandler: () => void
}) {
    const toast = useToastQueue()
    const [title, setTitle] = useState<string>()
    const [stage, setStage] = useState<StagesCreateComplaints>(StagesCreateComplaints.Start)
    const [complaintText, complaintTextDispatch] = useInputReducer()

    const handleLink = (text: string) => {
        setTitle(text)
        setStage(StagesCreateComplaints.ComplaintText)
    }

    const handleRequest = async () => {
        if (complaintText.validateResult) {
            const res = await Client.complaints.add(
                complaintText.value, 
                review_id, place_id
            )
            if (res.error) {
                toast.add("Что-то пошло не так! Перезагрузите страницу")
            } else {
               onCancelHandler() 
            }
        } else {
            toast.add("Проверьте, что описание более 10 символов!")
        }
    }
    return (
        <ModalWrapper onCancelHandler={onCancelHandler} isTransition={true}>
            <div className={s.CreateComplaints}>
                <div className={s.CreateComplaintsContent}>
                    <h1>
                        {
                            stage == StagesCreateComplaints.Start 
                            ? <>Создание жалобы</> 
                            : <>{title}</>
                        }
                    </h1>
                    <p>
                        Что вам кажется недопустимым 
                        <br/> 
                        в  
                        {type == CreateComplaintsType.Places 
                        ? <> карточке места</> 
                        : <> отзыве пользователя</>}
                        ?
                    </p>
                </div>
                {stage == StagesCreateComplaints.Start ?<MoreLinks>
                    {CreateComplaintsTexts[type].map((text, index) => 
                        <MoreLinksItem 
                            onClick={() => handleLink(text)}
                            key={index}
                        >
                            {text}
                        </MoreLinksItem>
                    )
                }
                </MoreLinks> : <></>}
                {stage == StagesCreateComplaints.ComplaintText ? <>
                    <Input type="text" rows={4}
                    state={complaintText} dispatch={complaintTextDispatch} 
                    placeholder="Расскажите подробнее о вашей жалобе"
                    />
                    <div className={s.CreateComplaintsButtons}>
                        <Button type={ButtonType.MainColor} onClick={handleRequest}>
                            Отправить
                        </Button>
                        <Button type={ButtonType.PrimaryDark} onClick={onCancelHandler}>
                            Отмена
                        </Button>
                    </div> 
                </>
                : <></>}
            </div>
        </ModalWrapper>
    )
}