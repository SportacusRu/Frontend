import NextLink from "next/link";
import { LinkProps } from "./types";

import s from "./Link.module.css";

/**
 * Renders a link component with the specified href, children, and icon.
 *
 * @param {string} href - The URL the link points to.
 * @param {React.ReactNode} children - The content of the link.
 * @param {React.ReactNode} icon - The optional icon to display alongside the link.
 * @return {JSX.Element} The rendered link component.
 */
export default function Link({href, children, icon}: LinkProps) {
    return <NextLink href={href} className={s.Link}>
        {icon ? icon : <></>}
        {children}
    </NextLink>
}