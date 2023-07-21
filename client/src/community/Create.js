import axios from 'axios';
import { useEffect, useState } from 'react';
import Layout from '../common/Layout';

function Create() {
	const [Tit, setTit] = useState('');
	const [Con, setCon] = useState('');
	const handleCreate = () => {
		const item = { title: Tit, content: Con };
		axios
			.post('/api/community/create', item)
			.then((res) => {
				console.log(res);
				alert('글 저장에 성공했습니다');
				setTit('');
				setCon('');
			})
			.catch((err) => {
				console.log(err);
				alert('글 저장에 실패했습니다');
			});
	};
	useEffect(() => {}, []);

	return (
		<Layout name={'Post'}>
			<label htmlFor='tit'>Title</label>
			<input type='text' id='tit' value={Tit} onChange={(e) => setTit(e.target.value)} /> <br />
			<label htmlFor='con'>Content</label>
			<textarea name='con' id='con' cols='30' rows='3' value={Con} onChange={(e) => setCon(e.target.value)}></textarea>
			<br />
			<button onClick={handleCreate}>SEND</button>
		</Layout>
	);
}

export default Create;
/*
	Create (저장)
	Read (읽기)
	Update (수정)
	Delete (삭제)
*/
