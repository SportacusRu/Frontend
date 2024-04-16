import { ComponentType, FC, SVGProps } from "react";
import { IconProps, IconSize } from "./types";
import dynamic from "next/dynamic";
import { colorsList } from "../color";

const sizes = [
  24, 32, 48
]
/**
 * Returns a React component that renders an SVG icon based on the provided icon type.
 *
 * @param {number} iconType - The type of the icon to be rendered.
 * @return {ComponentType<SVGProps<SVGElement>>} A React component that renders the SVG icon.
 */
function getIconComponent(iconType: number): ComponentType<SVGProps<SVGElement>> {
  return dynamic(() => import("../../assets/svg/" + iconType + ".svg"), { ssr: true });
}

/**
 * Renders an icon component based on the type and color specified.
 *
 * @param {Icons} type - The type of the icon.
 * @param {Colors} colorKey - The color key for the icon.
 * @return {JSX.Element} The rendered icon component.
 */
export default function Icon({ type, color: colorKey, size }: IconProps) {
  const IconComponent = getIconComponent(type);
  const colorValue = colorsList[colorKey];
  const iconSize = size ? sizes[size] : sizes[IconSize.S];

  return <IconComponent width={iconSize} height={iconSize} color={colorValue} />;
};
