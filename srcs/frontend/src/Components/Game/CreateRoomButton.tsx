import axios from "axios"
import {useContext} from 'react'
import { gameContext } from "../../utils/context/gameContext"

function CreateRoomButton({Player}: any) {
    const gameValue = useContext(gameContext)

    return (
        <div>
            <button onClick={() => axios.post('http://127.0.0.1:3000/game/createroom',{playerOne: gameValue.username}, {headers: {'Authorization': `bearer ${localStorage.getItem('token')}`}})
                                    .then(function(response){
                                        gameValue.useHost(true)
                                        gameValue.useInRoom(true)
                                        console.log(gameValue.inRoom)
                                        gameValue.useRoomId(response.data.roomId)
                                        console.log(response)
                                    }).catch(function(error){
                                        console.log(error)
                                    })}>
                Create Room
            </button>
            in room : {gameValue.inRoom === true ? "true" : "false"}
        </div>
    )
}

export default CreateRoomButton