import { ButtonProps } from "./types";
import s from "./Button.module.scss"
import classNames from "@/extensions/classNames";

const ButtonStyles = [
    s.main, s.primary, s.primaryDark, 
    s.dangerous, s.dangerousDark, s.outline, 
    s.circle
] as const;

/**
 * Renders a button component with the specified type.
 *
 * @param {ButtonProps} type - The type of the button.
 * @return {JSX.Element} The rendered button component.
 */
export default function Button({ type, children, onClick }: ButtonProps): JSX.Element {
    const buttonClassName = classNames(s.button, ButtonStyles[type]);

    return (
        <button className={buttonClassName} onClick={onClick}>
            {children}
        </button>
    );
}