import s from "./Navbar.module.scss";
import { NavbarWrapperProps } from "./types";


export default function({ children }: NavbarWrapperProps) {
    return (
        <div className={s.navbar}>
            {children}
        </div>
    )
}