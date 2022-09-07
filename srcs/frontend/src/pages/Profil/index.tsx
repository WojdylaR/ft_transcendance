import React from "react"
import { userContext } from "../../utils/context/userConext"
import Login from "../../Components/Login/index"
import {useContext} from "react"
import ProfilStyle from "../../Styles/Profil/Profil"
import {profilContext} from "../../utils/context/profilContext"
import ChangeUsername from "../../Components/Profil/changeUsername"
import ChangeAvatar from "../../Components/Profil/changeAvatar"
import Stat from "../../Components/Profil/stats"

function Profil() {
    const contextValue = useContext(userContext)
    const contextProfil = useContext(profilContext)

    return(
    contextValue.loginStatus === false ? <Login /> :
    <ProfilStyle>
	<div>
		<h1>{contextProfil.pseudo}</h1>
        <p className="all_stat">
            <Stat />
        </p>
        <p className="change">
        <span className="change_username">
            <ChangeUsername />
        </span>
        <span className="change_avatar">
            <ChangeAvatar />
        </span></p>
	</div>
    </ProfilStyle>)
}

export default Profil  