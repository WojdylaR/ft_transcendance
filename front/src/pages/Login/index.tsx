import React from "react"
import { Link } from 'react-router-dom';

class Login extends React.Component{
    render(){
    return(
	<div>
		<h1>Login</h1>
		<form /*onSubmit=*/>
			<input type='text' name='username' placeholder='Username' />
			<input type='text' name='password' placeholder='Password' />
			<Link to="/"> <button> Connexion </button> </Link>
		</form>
	</div>)
    }
}

export default Login