import { Route, Routes } from 'react-router-dom';
import GlobalStyle from "./Styles/Global"
import Game from "./pages/Game";
import Home from './pages/Home';
import Profil from "./pages/Profil";
import Footer from "./Components/Footer/Footer"
import Header  from './Components/Header/Header';
import ChatButton from "./Components/Chat/button"
import {userContext} from "./utils/context/userConext"
import {useState} from 'react'
import  {profilContext} from "./utils/context/profilContext"

function App(){
	let [username, usernameState] = useState("default")
	let [loginStatus, loginState] = useState(false)
	let [pseudo, pseudoState] = useState ("")
	let [inRoom, setInRoom] = useState(false)

	const contextProfil = {
		pseudo: pseudo,
		setPseudo: pseudoState,
		inRoom: inRoom,
		setInRoom: setInRoom

	}

	const contextValue = {
		username: username,
		useUsername: usernameState,
		loginStatus: loginStatus,
		setLogin: loginState,
	  }
    return (
		
    	<div >
			<userContext.Provider value={contextValue}>
			<profilContext.Provider value={contextProfil}>
			{loginStatus === true ? <Header /> : ""}
			<GlobalStyle />
    		<Routes>
    	    	<Route path="/" element={<Home />} />
    			<Route path="/Game" element={<Game />} />	
    			<Route path="/Profil" element={<Profil />} />
    		</Routes>


			{loginStatus === true ? <Footer /> : ""}
			</profilContext.Provider>
			</userContext.Provider>
    	</div>
    )
}

export default App