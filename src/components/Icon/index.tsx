import { ComponentType, FC, SVGProps } from "react";
import { IconProps } from "./types";
import dynamic from "next/dynamic";
import { colorsList } from "../color";

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
export default function Icon({ type, color: colorKey }: IconProps) {
  const IconComponent = getIconComponent(type);
  const colorValue = colorsList[colorKey];

  return <IconComponent width={24} height={24} color={colorValue} />;
};
