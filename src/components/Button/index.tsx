import { ButtonProps } from "./types";
import s from "./Button.module.css"
import classNames from "@/extensions/classNames";
import { Subhead } from "../Typography";

const ButtonStyles = [
    s.main, s.primary, s.primaryDark, 
    s.danger, s.dangerDark, s.outline, 
    s.circle, s.icon
] as const;

/**
 * Renders a button component with the specified type.
 *
 * @param {ButtonProps} type - The type of the button.
 * @return {JSX.Element} The rendered button component.
 */
export default function Button(
    { type, children, onClick, icon } : ButtonProps
): JSX.Element {
    const buttonClassName = classNames(s.button, ButtonStyles[type]);

    return (
        <button className={buttonClassName} onClick={onClick}>
            {icon ? icon : <></>}
            {children ? <Subhead>
                {children}
            </Subhead> : <></>}
        </button>
    );
}