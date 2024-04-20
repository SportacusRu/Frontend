"use client";
import { COOKIE_DATA } from "@/config/config";
import Button from "../Button";
import { ButtonType } from "../Button/types";
import Image from "next/image";

import s from "./Cookie.module.scss"
import { useEffect, useState } from "react";
import classNames from "@/extensions/classNames";

const COOKIE_KEY = "cookie"
const classesHide = classNames(s.cookie, s.hide)
const classesVisible = classNames(s.cookie)

export default function() {
    const [classes, setClasses] = useState(classesHide);
    
    useEffect(() => {
        let cookie = localStorage.getItem(COOKIE_KEY)
        if (cookie === "true") {
            setClasses(classesHide)
        } else {
            setClasses(classesVisible)
        }
    }, [])

    const handleClick = (_: any) => {
        localStorage.setItem(COOKIE_KEY, "true")
        setClasses(classesHide)
    }
    return (
        <div className={classes}>
            <div className={s.cookieData}>
                <h3>
                    {COOKIE_DATA.title}
                    <span>
                        <Image src="/cookie.svg" width={20} height={20} alt=""/>
                    </span>
                </h3>
                <p>{COOKIE_DATA.text}</p>
            </div>
            <Button 
                type={ButtonType.Primary}
                onClick={handleClick}
            >
                Окей
            </Button>
        </div>
        
    )
}