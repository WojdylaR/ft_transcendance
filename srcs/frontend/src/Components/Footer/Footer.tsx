import FooterStyle from '../../Styles/Footer/Footer'
import {useContext} from 'react'
import ChatButton from '../Chat/button'
import {userContext} from '../../utils/context/userConext'

function Footer(){
	const contextValue = useContext(userContext)
	let logOut = () => {
		localStorage.setItem('token', "")
		contextValue.setLogin(false)
						}

	return(
	<FooterStyle>
	<div>
	
		projet fait par :
	<p><button onClick={ChatButton} > Chat</button></p>
	<p><button onClick={()  => logOut()} > Log out</button></p>

	</div>
	</FooterStyle>
	)
}
export default Footer