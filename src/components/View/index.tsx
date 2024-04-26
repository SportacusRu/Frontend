"use client";
import useWidth from "@/hooks/useSize";
import { ViewProps } from "./types";
import Navbar from "../Navbar";
import { useEffect, useState } from "react";
import PlacesMap from "../PlacesMap/PlacesMap";
import Screens from "../Screens";
import Button from "../Button";
import { ButtonType } from "../Button/types";
import { Icons } from "../Icon/types";
import { Colors } from "../color";
import Icon from "../Icon";
import { Places, Reviews } from "@/client/models/types";
import useScreen, { PAGES } from "@/hooks/useScreen";
import { NAVBAR_PAGES } from "@/config/config";


export default function(props : ViewProps) {
    const { width } = useWidth();

    const [screen, setScreen] = useScreen();
    const [currentPlace, setCurrentPlace] = useState<Places>();
    const [reviews, setReviews] = useState<Reviews[]>();

    useEffect(() => {
        if (currentPlace) {
            setScreen(PAGES.Map);
        }
    }, [currentPlace, reviews])

    useEffect(() => {
        if (screen != PAGES.Map) {
            setCurrentPlace(undefined);
        }
    }, [screen])

    useEffect(() => {
        if (props.currentPlace && props.reviews) {
            setCurrentPlace(props.currentPlace);
            setReviews(props.reviews)
        }
    }, [props.currentPlace, props.reviews])

    const handleFilters = () => {
        setScreen(PAGES.Map);
    }

    return <>
        <Screens screen={screen}>
            {
                NAVBAR_PAGES.map((p, i) => <p.component 
                    key={i} 
                    setCurrentPlace={setCurrentPlace}
                    setReviews={setReviews}
                    places={props.places}
                    currentPlace={currentPlace}
                    reviews={reviews}
                />)
            }
        </Screens>
        {
            width && width <= 430 ? <Navbar 
                items={NAVBAR_PAGES} 
            />
            : width && <PlacesMap 
                places={props.places} 
                currentPlace={currentPlace} 
                setCurrentPlace={setCurrentPlace}
                setReviews={setReviews}
            />
        }
        {
            (width && width >= 430) || (screen == PAGES.Map) ? 
                <div className={"actionButtons"}>
                    <Button 
                        type={ButtonType.Icon} 
                        icon={<Icon type={Icons.add} color={Colors.greyLight}/>}
                    />
                    <Button 
                        type={ButtonType.Icon} 
                        icon={<Icon type={Icons.filter} color={Colors.greyLight}/>} 
                        onClick={handleFilters}
                    />

                    {(width && width >= 430) ? 
                        <Button 
                            type={ButtonType.Icon} 
                            icon={<Icon type={Icons.profile} color={Colors.greyLight}/>} 
                            onClick={() => setScreen(PAGES.Profile)}
                        />
                        : <></>
                    }
                </div>
            : <></>
        }
    </>
}