import { createContext } from 'react'

export const gameContext = createContext({
    username: "",
    useUsername: (newUsername: string) => {},
    host: false,
    useHost: (newHost: boolean) => {}, 
    roomId: null,
    useRoomId: (newRoomId: any) => {},
    //ssocketId: "",
    //useSockectId: (newSocketId: string) => {},
    inRoom: false,
    useInRoom: (newInRoom: boolean) => {},
    gameStart: false,
    useGameStart: (newGameStart: boolean) => {},
})

export default gameContext