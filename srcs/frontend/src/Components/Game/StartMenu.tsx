import axios from "axios";
import { useContext } from "react";
import gameContext from "../../utils/context/gameContext";


function StartMenu (){

    const gameValue = useContext(gameContext)
    let startGame = () => axios.post('http://127.0.0.1:3000/game/startgame',{gameStart: true, roomId: gameValue.roomId}, {headers: {'Authorization': `bearer ${localStorage.getItem('token')}`}})
                            .then(function(response){
                                console.log(response)
                                gameValue.useGameStart(true)
                            })
                            .catch(function(error){
                                console.log(error)
                            })

    return (
        <div className="startGame" >
            <button onClick={ () => startGame()}>Start</button>
            game start : {gameValue.gameStart === false ? <span>false</span> : <span>true</span>}
        </div>
    )
}

export default StartMenu