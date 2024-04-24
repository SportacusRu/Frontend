"use client";
import useWidth from "@/hooks/useSize";
import MainScreen from "../Screens/Main";
import { ViewProps } from "./types";
import Navbar from "../Navbar";
import { useEffect, useState } from "react";
import { NAVBAR_PAGES } from "@/config/config";
import PlacesMap from "../PlacesMap/PlacesMap";
import Screens from "../Screens";
import Button from "../Button";
import { ButtonType } from "../Button/types";
import { Icons } from "../Icon/types";
import { Colors } from "../color";
import Icon from "../Icon";
import { Places, Reviews } from "@/client/models/types";
import MapScreen from "../Screens/Map";
import { Client } from "@/client";


export default function(props : ViewProps) {
    const { width } = useWidth();
    const [screen, setScreen] = useState(Client.authorized ? 0 : 1);
    const [currentPlace, setCurrentPlace] = useState<Places>();
    const [reviews, setReviews] = useState<Reviews[]>();

    useEffect(() => {
        if (currentPlace) {
            setScreen(1);
        }
    }, [currentPlace, reviews])

    useEffect(() => {
        if (props.currentPlace && props.reviews) {
            setCurrentPlace(props.currentPlace);
            setReviews(props.reviews)
        }
    }, [props.currentPlace, props.reviews])

    const handleFilters = () => {
        setScreen(1);
    }

    return <>
        <Screens screen={screen}>
            <MainScreen places={props.places}/>
            <MapScreen 
                places={props.places} 
                currentPlace={currentPlace} 
                reviews={reviews}
                setCurrentPlace={setCurrentPlace} 
                setReviews={setReviews} 
                setScreen={setScreen}
            />
        </Screens>
        {
            width && width <= 430 ? <Navbar 
                items={NAVBAR_PAGES} 
                screen={screen} 
                setScreen={setScreen}
            />
            : width && <PlacesMap 
                places={props.places} 
                currentPlace={currentPlace} 
                setCurrentPlace={setCurrentPlace}
                setReviews={setReviews}
            />
        }
        {
            ((width && width >= 430) || (screen == 1)) ? <div className={"actionButtons"}>
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
                        onClick={() => setScreen(2)}
                    />
                    : <></>
                }
            </div>
            : <></>
        }
    </>
}