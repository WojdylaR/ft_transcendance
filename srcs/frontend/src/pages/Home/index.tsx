import { userContext } from "../../utils/context/userConext"
import Login from "../../Components/Login/index"
import { useContext } from "react"
import HomeStyle from "../../Styles/Home/Home"

function Home(){
  const contextValue = useContext(userContext)

  return(
  contextValue.loginStatus === false ? <Login /> :
  <HomeStyle>
  <div>
    <h1>Je suis la page de Home</h1>
  </div>
  </HomeStyle>
  )
}

export default Home