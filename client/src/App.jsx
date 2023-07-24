import { Routes, Route } from 'react-router-dom';
import Header from './common/Header';
import Main from './common/Main';
import List from './community/List';
import Create from './community/Create';
import GlobalStyle from './GlobalStyle';
import Detail from './community/Detail';
import Edit from './community/Edit';

function App() {
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
			</Routes>
		</>
	);
}
export default App;
//파람-뒤에 어떤 값이 들어가든 ???
