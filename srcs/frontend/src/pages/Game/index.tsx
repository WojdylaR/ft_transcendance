import React from "react"
import {useState} from 'react'
import { useContext } from "react"
import Login from "../../Components/Login/index"
import { userContext } from "../../utils/context/userConext"
import GameStyle from "../../Styles/Game/Game"
import Ball from "../../Components/Game/Ball"
import GameComponent from "../../Components/Game/GameComponent"
import gameContext from "../../utils/context/gameContext";
import { profilContext } from "../../utils/context/profilContext"
import { io } from "socket.io-client"
import ScoreBoard from "../../Components/Game/ScoreBoard"

function Game(){
    const contextPseudo = useContext(profilContext)
    const token = localStorage.getItem('token');
    //const socket = io("http://localhost::90/game", {query: {token}}); 
    let [username, useUsername] = useState("")
    let [host, useHost] = useState(false)  
    let [roomId, useRoomId] = useState(null)
    //let [socketId, useSockectId] = useState(socket.id)
    let [inRoom, useInRoom] = useState(false)
    let [gameStart, useGameStart] = useState(false)
    
    const contextValue = useContext(userContext)
    const contextGame = {
        username: contextPseudo.pseudo,
        useUsername: useUsername,
        host: host,
        useHost: useHost,
        roomId: roomId,
        useRoomId: useRoomId,
        //socketId: socketId,
        //useSockectId: useSockectId,
        inRoom: inRoom,
        useInRoom: useInRoom,
        gameStart: gameStart,
        useGameStart: useGameStart,
    }

    return(
    contextValue.loginStatus === false ? <Login /> : 
    <GameStyle>
    <gameContext.Provider value={contextGame}>
	<div>
        <GameComponent />
	</div>
    </gameContext.Provider>
    </GameStyle>)
}


export default Game