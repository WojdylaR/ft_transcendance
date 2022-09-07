import axios from "axios"
import { useContext, useState } from "react"
import gameContext from "../../utils/context/gameContext"

function ScoreBoard () {

    const gameValue = useContext(gameContext)
    let getScore = () =>{axios.post('http://127.0.0.1:3000/game/getscore',{roomId: gameValue.roomId}, {headers: {'Authorization': `bearer ${localStorage.getItem('token')}`}})
                            .then(function(response){
                                console.log(response)
                            })
                            .catch(function(error){
                                console.log(error)
                            })
                        }
    getScore();
    return  (
        <div className="ScoreBoard">
            <span>x = {} </span><span>:</span><span> y = {}</span>
        </div>
    )
}

export default ScoreBoard