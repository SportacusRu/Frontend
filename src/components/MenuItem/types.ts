import { Icons } from "../Icon/types";
import { Colors } from "../color";

export type MenuItemProps = {
    icon: Icons,
    onClick?: () => void,
    children: React.ReactNode,
    color: Colors
}