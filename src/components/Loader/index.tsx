import ClipLoader from "react-spinners/ClipLoader";
import { Colors, colorsList } from "../color";
import s from "./Loader.module.css"


const accentColor = colorsList[Colors.accent];

export default function({loading}: {loading: boolean}) {
    return <>
        {
        loading ? <div className={s.loader}>
            <ClipLoader loading={loading} color={accentColor}/>
        </div> : <></>
        }
      </>
}