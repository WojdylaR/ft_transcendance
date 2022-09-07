import axios from "axios";
import {Socket, io} from 'socket.io-client'

function Ball() {
    const getXYBall = () => {axios.patch('http://127.0.0.1:3000/game', {down: true},{ headers: {'Authorization': `bearer ${localStorage.getItem('token')}`}})
    .then(function(response) {
        console.log(response);
    })
    .catch(function(error) {
        console.log(error);
    })}
    return (
        
        <div>
            <button>bouton</button>B
        </div>
    )
}

export default Ball