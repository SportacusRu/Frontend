import s from "./MoreLinks.module.scss";

export default function({
    children 
}: { children: React.ReactNode }) {
    return (
        <div className={s.MoreLinksItem}>
            {children}
        </div>
    )
}