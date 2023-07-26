import { useState, useEffect } from 'react';
import Layout from '../common/Layout';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

/*
  글수정 흐름
  1.Edit컴포넌트 접속하자마자 글 고유번호에 해당하는 데이터를 서버로부터 전달받음
  2.전달받은 데이터를 각각 제목, 본문 State에 옮겨담아서 폼요소안에 출력
  3.폼안에 있는 값을 변경후 update버튼 클릭시 해당 데이터값을 하나의 객체로 묶어서 서버쪽에 전달
  4.서버쪽에서는 해당 body-parser객체를 받아서 updateOne메서드로 데이터 수정 ($set방식)
  5.수정이 완료되면 프론트쪽에 성공 메세지 전달
*/

function Edit() {
	const navigate = useNavigate();
	const params = useParams();
	const [Title, setTitle] = useState('');
	const [Content, setContent] = useState('');
	const [Detail, setDetail] = useState({});
	const user = useSelector((store) => store.user);

	const handleUpdate = () => {
		if (Title.trim() === '' || Content.trim() === '') return alert('모든 항목을 입력하세요.');

		const item = {
			title: Title,
			content: Content,
			id: params.id,
		};
		axios.post('/api/community/edit', item).then((res) => {
			if (res.data.success) {
				alert('글 수정이 완료되었습니다.');
				navigate(-1);
			} else {
				alert('글 수정에 실패했습니다.');
			}
		});
	};

	useEffect(() => {
		if (user.uid === '') navigate('/');
		axios.post('/api/community/detail', params).then((res) => {
			if (res.data.success) {
				console.log(res.data.detail);
				setDetail(res.data.detail);
			}
		});
	}, [navigate, user, params]);

	useEffect(() => {
		//서버쪽으로 새로운 응답이 넘어오자마자
		console.log(Detail);
		setTitle(Detail.title);
		setContent(Detail.content);
	}, [Detail]);

	return (
		<Layout name={'Post'}>
			<label htmlFor='tit'>Title</label>
			<input type='text' id='tit' value={Title || ''} onChange={(e) => setTitle(e.target.value)} /> <br />
			<label htmlFor='con'>Content</label>
			<textarea
				id='con'
				cols='30'
				rows='3'
				value={Content || ''}
				onChange={(e) => setContent(e.target.value)}
			></textarea>
			<br />
			<button onClick={handleUpdate}>UPDATE</button>
		</Layout>
	);
}
export default Edit;
