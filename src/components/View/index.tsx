"use client";
import useWidth from "@/hooks/useWidth";
import MainScreen from "../Screens/Main";
import { ViewProps } from "./types";
import Navbar from "../Navbar";
import { useState } from "react";
import { NAVBAR_PAGES } from "@/config/config";
import PlacesMap from "../PlacesMap/PlacesMap";
import Screens from "../Screens";
import Button from "../Button";
import { ButtonType } from "../Button/types";
import { Icons } from "../Icon/types";
import { Colors } from "../color";
import Icon from "../Icon";
import Map from "../Screens/Map";


export default function({places} : ViewProps) {
    const width = useWidth();
    const [screen, setScreen] = useState(0);
    const [viewFilters, setViewFilters] = useState(0);
    return <>
        <Screens screen={screen}>
            <MainScreen places={places}/>
            <Map places={places} />
        </Screens>
        {
            width && width < 430 ? <Navbar 
                items={NAVBAR_PAGES} 
                screen={screen} 
                setScreen={setScreen}
            />
            : width && <PlacesMap places={places} currentPlace={undefined}/>
        }
        {
            (width && width >= 430) || (screen == 1) ? <div className={"actionButtons"}>
                <Button 
                    type={ButtonType.Icon} 
                    icon={<Icon type={Icons.add} color={Colors.greyLight}/>} 
                />
                <Button 
                    type={ButtonType.Icon} 
                    icon={<Icon type={Icons.filter} color={Colors.greyLight}/>} 
                />
                {
                (width && width >= 430) ? 
                    <Button 
                        type={ButtonType.Icon} 
                        icon={<Icon type={Icons.profile} color={Colors.greyLight}/>} 
                        onClick={() => setScreen(1)}
                    />
                    : <></>
            }
            </div>
            : <></>
        }
    </>
}