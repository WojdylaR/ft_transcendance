import { Route, Routes } from 'react-router-dom';
import Chat from "./Components/Chat/chat";
import Game from "./pages/Game";
import Home from './pages/Home';
import Login from "./pages/Login";
import Ranking from "./pages/Ranking";
import Header from "./Components/Header/Header"
import Footer from "./Components/Footer/Footer"
import ChatButton from "./Components/Chat/button"

function App(){
    return (
    	<div>
			<Header />
    		<Routes>
    	    	<Route path="/" element={<Home />} />
    			<Route path="/Game" element={<Game />} />
    			<Route path="/Login" element={<Login />} />
    			<Route path="/Ranking" element={<Ranking />} />
    		</Routes>
			<ChatButton />
			<Footer />
    	</div>
    )
}

export default App