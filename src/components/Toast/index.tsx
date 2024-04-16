import s from "./Toast.module.css";
export function Toast({ children }: { children: React.ReactNode }) {
    return <div className={s.toast}>
        <p>
            {children}
        </p>
    </div>;
}