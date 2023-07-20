import Layout from '../common/Layout';
import axios from 'axios';
import { useEffect } from 'react';

function List() {
	useEffect(() => {
		axios.post('/api/read').then((res) => {
			console.log(res);
		});
	}, []);
	return <Layout name={'List'}>List</Layout>;
}

export default List;
