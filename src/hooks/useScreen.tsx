import { ScreenContext, PAGES } from "@/shared/ScreenProvider";
import { useContext } from "react";


const useScreen = () => useContext(ScreenContext)

export { PAGES };
export default useScreen