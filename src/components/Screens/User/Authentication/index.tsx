"use client"

import { useState } from "react"
import { Stages } from "./types";
import Image from "next/image";
import { ButtonType } from "@/components/Button/types";
import Button from "@/components/Button";

import s from "./Authentication.module.scss"
import Authorization from "../Authorization";
import Registation from "../Registation";
import Link from "@/components/Link";
import Icon from "@/components/Icon";
import { Icons } from "@/components/Icon/types";

export default function() {
    const [stage, setStage] = useState(Stages.Start);
    return <>
        <div className={s.authenticationCancel}>
            {
            stage != Stages.Start ? 
                <Link 
                    icon={<Icon type={Icons.arrowLeft} />}
                    onClick={() => setStage(Stages.Start)}
                >
                    Назад
                </Link> : <></>
            }
        </div>
        { 
        stage == Stages.Start ? <div className={s.authentication}>
            <Image 
                src={"/UserAdd.svg"} 
                height={200} width={200} 
                alt="Add a new user or authorization old" 
                className={s.authenticationImage}
            />
            <div className={s.authenticationContent}>
                <h1>
                    Зарегеструйтесь
                    <br />или войдите 
                    <br />в Sportacus 
                </h1>
                <div className={s.authenticationButtons}>
                    <Button 
                        type={ButtonType.MainColor}
                        onClick={() => setStage(Stages.Authorization)}
                >
                        Войти
                    </Button>
                    <Button 
                        type={ButtonType.Primary}
                        onClick={() => setStage(Stages.Registration)}
                    >
                        Зарегестрироваться
                    </Button>
                </div>
            </div>
        </div> : stage == Stages.Authorization 
            ? <Authorization setStage={setStage}/> 
            : <Registation />
        }
    </>
}