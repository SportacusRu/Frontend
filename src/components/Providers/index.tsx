import CurrentPlaceProvider from "@/shared/CurrentPlaceProvider";
import FiltersProvider from "@/shared/FiltersProvider";
import ScreenProvider from "@/shared/ScreenProvider";
import UserDataProvider from "@/shared/UserDataProvider";
import UserPositionProvider from "@/shared/UserPositionProvider";

export default function({children}: {children: React.ReactNode}) {
    return (
        <UserDataProvider>
            <CurrentPlaceProvider>
                <UserPositionProvider>
                    <FiltersProvider>
                        <ScreenProvider>
                            {children}
                        </ScreenProvider>
                    </FiltersProvider>
                </UserPositionProvider>
            </CurrentPlaceProvider>
        </UserDataProvider>
    )
}