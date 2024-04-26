"use client";
import useWidth from "@/hooks/useSize";
import { ViewProps } from "./types";
import Navbar from "../Navbar";
import { useEffect } from "react";
import PlacesMap from "../PlacesMap/PlacesMap";
import Screens from "../Screens";
import Button from "../Button";
import { ButtonType } from "../Button/types";
import { Icons } from "../Icon/types";
import { Colors } from "../color";
import Icon from "../Icon";
import useScreen, { PAGES } from "@/hooks/useScreen";
import { NAVBAR_PAGES } from "@/config/config";
import { useCurrentPlace } from "@/shared/CurrentPlaceProvider";


export default function(props : ViewProps) {
    const { width } = useWidth();

    const [screen, setScreen] = useScreen();
    const { currentPlace, currentReviews }= useCurrentPlace();

    useEffect(() => {
        if (currentPlace.value) {
            setScreen(PAGES.Map);
        }
    }, [currentPlace.value, currentReviews.value])

    useEffect(() => {
        if (screen != PAGES.Map) {
            currentPlace.set(undefined);
        }
    }, [screen])

    useEffect(() => {
        if (props.currentPlace && props.reviews) {
            currentPlace.set(props.currentPlace);
            currentReviews.set(props.reviews)
        }
    }, [props.currentPlace, props.reviews])

    const handleFilters = () => {
        setScreen(PAGES.Map);
    }

    return <>
        <Screens screen={screen}>
            {
                NAVBAR_PAGES.map((p, i) => <p.component 
                    key={i} places={props.places}
                />)
            }
        </Screens>
        {
            width && width <= 430 
            ? <Navbar items={NAVBAR_PAGES} />
            : width && <PlacesMap places={props.places} />
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