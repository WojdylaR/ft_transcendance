import React, {useContext} from "react"
import axios from 'axios'
import {useState} from 'react'
import { userContext } from "../../utils/context/userConext"
import LoginStyle from "../../Styles/Login/Login"
import { profilContext} from '../../utils/context/profilContext'

function Login(){

    const contextValue = useContext(userContext)
    const pseudoValue = useContext(profilContext)

    let [_username, usernameState] = useState("")
    let [_password, passwordState] = useState("")
    const getUsername = () => {axios.get('http://127.0.0.1:3000/user/info/me', { headers: {'Authorization': `bearer ${localStorage.getItem('token')}`}})
    .then(function (response) {
      console.log(response)
      contextValue.setLogin(true)
      contextValue.useUsername(response.data.username)
      pseudoValue.setPseudo(response.data.displayname)
    }) 
    .catch(function (error) {
      console.log(error.response.data.message);
    })}

    const logIn = () => {axios.post('http://127.0.0.1:3000/login/basic_auth_login', {
      username: _username,
      password: _password
  })
.then(function (response) {
  localStorage.setItem('token', response.data.accessToken)
  
  getUsername(response.data.accessToken);
})
.catch(function (error) {
  alert(error.response.data.message)
})}
    return(
      <LoginStyle>
	<div>
      {getUsername(localStorage.getItem('token'))}
		<h2>Hello, welcome to our project for 42 !</h2>
    <p>To continue, you need to log with your 42 log or you can just register if you aren't from 42 !</p>
    <p className="boutton">
			<input type='text' name='username' placeholder='Username' 
      onChange={(e) => {
        usernameState(e.target.value)
       }}
       />
			<input type='text' name='password' placeholder='Password' 
      onChange={(e) => {
        passwordState(e.target.value)
       }}/>


		 <button onClick={() => axios.post('http://127.0.0.1:3000/login/basic_auth_register', {
    username: _username,
    password: _password
  })
  .then(function (response) {
    console.log(response);
    logIn();
  }) 
  .catch(function (response) {
    console.log(response.response.data.message);
    alert(response.response.data.message)
  })}

  > register </button>
    <button onClick={() => logIn()}>
      login
    </button>
    <button onClick={() => axios.post('http://127.0.0.1:3000/login', {code: "",state : ""})
  .then(function (response) {
    console.log(response);
    logIn();
  }) 
  .catch(function (response) {
    console.log(response.response.data.message);
    alert(response.response.data.message)  
  })}>Connect with 42 api</button>
  </p>
  {console.log("hello" + localStorage.getItem('token'))}
  </div>
    </ LoginStyle >)
} 



export default Login