import axios from 'axios'
import {useState} from 'react'

function ChangeAvatar() {

    let [newAvatar, avatarState] = useState("")

    return (
        <span>
            Changer d'avatar : <input type="file" id="avatar" name="avatar" accept="image/png, image/jpeg" onChange={ (e) => {avatarState(e.target.value)}}/>
            <button onClick={ () =>  axios.post('http://127.0.0.1:3000/user/displayname', {
            }, {
            headers: {'Authorization': `bearer ${localStorage.getItem('token')}`}})
       .then(function (response) {
         console.log(response);
       }) 
       .catch(function (error) {
         console.log(error);
       })} >Send Avatar</button>
        </span>
    )
}

export default ChangeAvatar