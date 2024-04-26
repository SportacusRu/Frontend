import CurrentPlaceProvider from "@/shared/CurrentPlaceProvider";
import FiltersProvider from "@/shared/FiltersProvider";
import ScreenProvider from "@/shared/ScreenProvider";
import UserPositionProvider from "@/shared/UserPositionProvider";

export default function({children}: {children: React.ReactNode}) {
    return (
        <CurrentPlaceProvider>
            <UserPositionProvider>
                <FiltersProvider>
                    <ScreenProvider>
                        {children}
                    </ScreenProvider>
                </FiltersProvider>
            </UserPositionProvider>
        </CurrentPlaceProvider>
    )
}