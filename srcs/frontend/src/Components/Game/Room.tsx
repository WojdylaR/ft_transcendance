import { useContext } from "react"
import { gameContext } from "../../utils/context/gameContext"
import ScoreBoard from "./ScoreBoard"
import StartMenu from "./StartMenu"

function Room() {
    const gameValue = useContext(gameContext)

    return(
        gameValue.gameStart === false ? <StartMenu /> :
        <div>
            <ScoreBoard />
        </div>
    )
}
export default Room