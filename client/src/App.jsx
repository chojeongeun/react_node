import { Routes, Route } from 'react-router-dom';
import Header from './common/Header';
import Main from './common/Main';
import List from './community/List';
import Create from './community/Create';
import GlobalStyle from './GlobalStyle';
import Detail from './community/Detail';
import Edit from './community/Edit';
import Join from './user/Join';
import Login from './user/Login';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { loginUser, logoutUser } from './redux/userSlice';
import firebase from './firebase';

function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		firebase.auth().onAuthStateChanged((userInfo) => {
			console.log(userInfo);
			if (userInfo === null) dispatch(logoutUser());
			else dispatch(loginUser(userInfo.multiFactor.user));
		});
	}, [dispatch]);

	return (
		<>
			<GlobalStyle />
			<Header />

			<Routes>
				<Route path='/' element={<Main />} />
				<Route path='/list' element={<List />} />
				<Route path='/create' element={<Create />} />
				<Route path='/detail/:id' element={<Detail />} />
				<Route path='/edit/:id' element={<Edit />} />
				<Route path='/join' element={<Join />} />
				<Route path='/login' element={<Login />} />
			</Routes>
		</>
	);
}
export default App;
//파람-뒤에 어떤 값이 들어가든 ???
