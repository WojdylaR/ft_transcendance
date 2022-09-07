import { createContext } from "react";

export const profilContext = createContext ({
    pseudo: "",
    setPseudo: (newPseudo: any) => {},
    inRoom: false,
    setInRoom: (setInRoom: boolean) => {},
})