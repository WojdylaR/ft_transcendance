import { Link } from 'react-router-dom';

function Header(){
	return(
	<nav style={{
		backgroundColor: 'grey',
	}}>
		<h2><Link to="/">Home</Link></h2>
		<h2><Link  to="/Game"> Games </Link></h2>
		<h2><Link to="/Ranking"> Ranking</Link></h2>
	</nav>
	)
}

export default Header