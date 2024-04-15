import { StarsProps } from "./types";
import Image from "next/image";
import s from "./stars.module.css"

const disabledRating = '/stars/stars_disabled.svg';
const enabledRating = '/stars/stars_enabled.svg';

export default function Stars({ rating }: StarsProps) {
  const starsWidth = rating / 5 * 94;

  return (
    <div className={s.Stars}>
      <Image src={disabledRating} width={94} height={14} alt="Disabled Stars"/>
      <Image src={enabledRating} width={starsWidth} height={14} alt="Enabled Stars"/>
    </div>
  );
}
