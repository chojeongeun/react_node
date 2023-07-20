import { NavLink, Link } from 'react-router-dom';
function Header() {
	const activeStyle = { color: 'aqua' };
	return (
		<header>
			<h1>
				<Link to='/'>LOGO</Link>
			</h1>

			<ul id='gnb'>
				<li>
					<NavLink to='/list' style={(props) => (props.isActive ? activeStyle : null)}>
						Show List
					</NavLink>
				</li>
				<li>
					<NavLink to='/create' style={(props) => (props.isActive ? activeStyle : null)}>
						Write Post
					</NavLink>
				</li>
			</ul>
		</header>
	);
}
export default Header;
