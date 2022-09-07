import {useState} from 'react'
import axios from 'axios'

function ChangeUsername () {
    const [newusername, newusernameState] = useState("")

    return (
        <span>
            <input placeholder="New Username" onChange={(e) => {
        newusernameState(e.target.value)
        
       }}/><button onClick = {() => axios.post('http://127.0.0.1:3000/user/displayname', {
            displayname: newusername}, {
            headers: {'Authorization': `bearer ${localStorage.getItem('token')}`}})
       .then(function (response) {
          alert('New username: ' + response.data)
         console.log(response);
         window.location.reload();
       }) 
       .catch(function (error) {
         alert('Name taken or invalid')
         console.log(error);
       })} >Change Username</button>
        </span>
    )
}

export default ChangeUsername