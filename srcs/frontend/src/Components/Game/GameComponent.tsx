import axios from "axios";
import { Socket, io } from "socket.io-client";
import gameContext from "../../utils/context/gameContext";
import { useContext, useState, useTransition } from "react";
import { profilContext } from "../../utils/context/profilContext";
import  CreateRoomButton from "./CreateRoomButton"
import Room from "./Room"

 

function GameComponent() {
    
    const contextPseudo = useContext(profilContext)
    const gameValue = useContext(gameContext)

    
    
    return (
    gameValue.inRoom === true ? <Room />:
        <div>
                <CreateRoomButton/> 
            
        </div>
    )
}

export default GameComponent