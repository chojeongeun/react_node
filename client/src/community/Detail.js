import Layout from '../common/Layout';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';

function Detail() {
	const params = useParams();
	console.log(params);
	const [Detail, setDetail] = useState(null); //객체값 가져올거니까 null로 초기화

	useEffect(() => {
		axios
			.post('/api/community/detail', params)
			.then((res) => {
				if (res.data.success) {
					setDetail(res.data.detail);
				} else {
					alert('상세글 호출에 실패했습니다.');
				}
			})
			.catch((err) => console.log(err));
	}, []);

	return (
		<Layout name={'Detail'}>
			<h2>{Detail?.title}</h2>
			<p>{Detail?.content}</p>
		</Layout>
	);
}

export default Detail;
