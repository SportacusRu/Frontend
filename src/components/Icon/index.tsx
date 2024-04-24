import { ComponentType, SVGProps, useMemo } from "react";
import { IconProps, IconSize } from "./types";
import dynamic from "next/dynamic";
import { colorsList } from "../color";

const sizes = [
  24, 32, 64
]

function getIconComponent(iconType: number): ComponentType<SVGProps<SVGElement>> {
  return dynamic(() => import("../../assets/svg/" + iconType + ".svg"), { ssr: true });
}

/**
 * Renders an icon component based on the type and color specified.
 *
 * @param {Icons} type - The type of the icon.
 * @param {Colors} color - The color key for the icon.
 * @return {JSX.Element} The rendered icon component.
 */
export default function Icon({ type, color, size }: IconProps): JSX.Element {
  const IconComponent = useMemo(() => getIconComponent(type), [type]);
  const colorValue = color !== undefined ? colorsList[color] : undefined;
  const iconSize = size ? sizes[size] : sizes[IconSize.S];

  return <IconComponent width={iconSize} height={iconSize} color={colorValue} />;
};
