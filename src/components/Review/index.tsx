import Avatar from "../Avatar";
import { Icons } from "../Icon/types";
import Menu from "../Menu";
import MenuItem from "../MenuItem";
import Stars from "../Stars/Stars";
import { Caption, Headline, Subhead } from "../Typography";
import { Colors } from "../color";
import { ReviewProps } from "./types";
import s from "./Review.module.scss"

export default function(props : ReviewProps) {
    return <div className={s.review}>   
        <div className={s.reviewHeader}>
            <div className={s.reviewHeaderContent}>
                <Avatar userPhoto={props.userPhoto} />
                <div>
                    <Subhead>{props.userName}</Subhead>
                    <Caption>{props.time}</Caption>
                </div>
            </div>
            <Menu>
                {props.viewUserPage ? 
                    <MenuItem 
                        icon={Icons.arrowCircle} 
                        color={Colors.white}
                        onClick={props.viewPageHandler}
                    >
                        Перейти к месту
                    </MenuItem> 
                    : <></>
                }
                <MenuItem 
                    icon={Icons.complaints} 
                    color={Colors.danger} 
                    onClick={props.complaintHandler}
                >
                    Пожаловаться
                </MenuItem>
            </Menu>
        </div>
        <div className={s.reviewRating}>
            <Headline>Оценка</Headline>
            <Stars rating={props.rating}/>
        </div>
    
        <p>
            {props.description}
        </p>
    </div>

}