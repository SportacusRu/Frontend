import NavbarItem from "../NavbarItem"
import NavbarWrapper from "../NavbarWrapper"
import { NavbarProps } from "./types"


export default function({screen, setScreen, items} : NavbarProps) {
    return (
        <NavbarWrapper>
        {
            items.map((item, i) => <NavbarItem 
                iconType={item.icon} 
                key={i}
                active={screen == i}
                onClick={() => setScreen(i)}
            >
                {item.title}
            </NavbarItem>)
        }
        </NavbarWrapper>
    )
}