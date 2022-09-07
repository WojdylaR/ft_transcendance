import { createContext } from "react";

export const userContext = createContext({
    username: "",
    useUsername: (newtoken: any) => {},
    loginStatus: false,
    setLogin: (newtoken: boolean) => {}
})