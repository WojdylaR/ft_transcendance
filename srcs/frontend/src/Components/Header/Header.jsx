import { Link } from 'react-router-dom';
import HeaderStyle from '../../Styles/Header/Header'
import axios from 'axios'
import React, {useContext} from 'react'
import {userContext} from '../../utils/context/userConext'
import {profilContext} from '../../utils/context/profilContext';




function Header(){
	const contextPseudo = useContext(profilContext)

		return(
	<HeaderStyle>
		<div>
		<img style={{width:"7%", float:'left'}}src={require('./../../assets/profil.jpg')} alt="profil_picture" />
		<p id="nav">
		<h2><Link to="/">Home</Link></h2>
		<h2><Link  to="/Game">Games </Link></h2>
		<h2><Link to="/Profil">Profil</Link></h2>
		</p>
		<p className="profil">{contextPseudo.pseudo}</p>
		</div>
	</HeaderStyle>
	)}

export default Header