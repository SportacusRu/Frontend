import Button from "@/components/Button"
import { ButtonType } from "@/components/Button/types"
import Input from "@/components/Input"
import MoreLinks from "@/components/MoreLinks"
import MoreLinksItem from "@/components/MoreLinksItem"
import useInputReducer from "@/hooks/useInputReducer"
import { useState } from "react"

export default function(type: string) {
    const [title, setTitle] = useState<string>()
    const [complaintText, complaintTextDispatch] = useInputReducer()
    return (
        <div>
            <div>
                <h1>Создание жалобы</h1>
                <p>
                    Что вам кажется недопустимым 
                    <br/> 
                    в  
                    {type ? <>карточке места</> : 
                        <>отзыве пользователя</>}
                    ?
                </p>
            </div>
            <MoreLinks>
                <MoreLinksItem>

                </MoreLinksItem>
            </MoreLinks>
            <Input type="text" rows={4}
                   state={complaintText} dispatch={complaintTextDispatch} 
                   placeholder="Расскажите подробнее о вашей жалобе"
            />
            <div>
                <Button type={ButtonType.MainColor}>
                    Отправить
                </Button>
                <Button type={ButtonType.PrimaryDark}>
                    Отмена
                </Button>
            </div>
                
        </div>
    )
}