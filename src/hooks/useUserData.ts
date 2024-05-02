import { UserDataContext } from "@/shared/UserDataProvider";
import { useContext } from "react";


const useUserData = () => useContext(UserDataContext)

export default useUserData