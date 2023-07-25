import { NavLink, Link } from 'react-router-dom';
import styled from 'styled-components';

function Header() {
	const activeStyle = { color: 'aqua' };

	const HeaderWrap = styled.header`
		width: 350px;
		height: 100vh;
		background: #222;
		position: fixed;
		top: 0px;
		left: 0px;
		padding: 50px;
	`;

	const Logo = styled.h1`
		margin-bottom: 40px;
		a {
			font: 40px/1 'arial';
			color: #fff;
		}
	`;

	const Gnb = styled.ul`
		a {
			display: block;
			padding: 10px;
			font: bold 16px/1 'arial';
			color: #bbb;
		}
	`;

	const Util = styled.ul`
		position: absolute;
		bottom: 50px;
		left: 50px;
		display: flex;
		gap: 20px;

		li {
			a {
				font: 14px/1 'arial';
				color: #555;
			}
		}
	`;
	return (
		<HeaderWrap>
			<Logo>
				<Link to='/'>LOGO</Link>
			</Logo>

			<Gnb>
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
			</Gnb>

			<Util>
				<li>
					<NavLink to='/login' style={(props) => (props.isActive ? activeStyle : null)}>
						Login
					</NavLink>
				</li>
				<li>
					<NavLink to='/join' style={(props) => (props.isActive ? activeStyle : null)}>
						Join
					</NavLink>
				</li>
			</Util>
		</HeaderWrap>
	);
}
export default Header;
