"use client";
import Filter from "@/components/Filter";
import { Icons, allFilters } from "@/components/Icon/types";
import Scrollbar from "@/components/Scrollbar";
import { useFilters } from "@/shared/FiltersProvider";

import s from "./filters.module.css"
import FiltersSlider from "@/components/filtersSlider";
import Modal from "..";

import { TouchEvent, useState } from "react";
import useSize from "@/hooks/useSize";

import Link from "@/components/Link";
import { Colors } from "@/components/color";
import Icon from "@/components/Icon";
import { FiltersModalState } from "./types";
import { Client } from "@/client";
import Image from "next/image";


export default function FiltersModal({ setScreen } : FiltersModalState) {
    const { height, width } = useSize()
    const [store, dispatch] = useFilters();
    const authorized = Client.authorized
    const [containerHeight, setContainerHeight] = useState(120)
    const [draggable, setDraggable] = useState(false)
    
    const toggleFilters = (filterName: string) => {
        if (store.filters.includes(filterName)) {
            dispatch({ type: "REMOVE_FILTER", payload: filterName })
        } else {
            dispatch({ type: "ADD_FILTER", payload: filterName })
        }
    }
    const onMouseDownHandler = () => setDraggable(true);

    const onMouseUpHandler = () => {
        setDraggable(false);
        if (containerHeight < 240) setContainerHeight(120)
    }

    const onHandleCancel = () => setScreen(0)

    const onDragHandler = (e: TouchEvent<HTMLDivElement>) => {
        const positionY = e.changedTouches[0].clientY;
        if (draggable && !(positionY < 120) && (height - positionY) > 120) {
            setContainerHeight(height - positionY)
        }
    }

    return (
        <Modal background={false}>
            {width > 430 ? 
                <div className={s.header}>
                    {authorized ? <Link 
                        icon={<Icon type={Icons.arrowLeft} color={Colors.accent}/>} 
                        onClick={onHandleCancel}>
                        Назад
                    </Link> : <Image src={"/logo.svg"} width={152} height={29} alt="logo"/>}
                    <p>Выберите категорию</p>
                </div> : <></>}
            <div 
                className={s.filterScreen}
                style={width <= 430 ? {height: `${containerHeight}px`} : {}}
                onTouchStart={onMouseDownHandler}
                onTouchEnd={onMouseUpHandler}
                onTouchMove={onDragHandler}
            >
                {width <= 430 ? <div className={s.filterScreenHandle}>
                    <div></div>
                </div> : <></>}
                <FiltersSlider reducer={[store, dispatch]}/>
                <h1 className={s.title}>Фильтры</h1>
                <Scrollbar className={s.filtersList}>
                    <div className={s.filtersContent}>
                            {allFilters.map((filter, i) => <Filter 
                            type={filter} onClick={toggleFilters} key={i}
                        />)}
                    </div>
                </Scrollbar>
            </div>
        </Modal>
    )
}