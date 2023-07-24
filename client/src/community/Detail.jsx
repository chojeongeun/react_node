import Layout from '../common/Layout';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const DetailWrap = styled.div`
	width: 100%;
	padding: 40px;
	background: #fff;
	box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.02);
`;

const BtnSet = styled.nav`
	display: flex;
	gap: 20px;
	margin-top: 20px;
	a {
		color: #fff;
	}
`;

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
			<DetailWrap>
				<h2>{Detail?.title}</h2>
				<p>{Detail?.content}</p>
			</DetailWrap>

			<BtnSet>
				<button>
					<Link to={`/edit/${params.id}`}>Edit</Link>
				</button>

				<button>
					<Link>Delete</Link>
				</button>
			</BtnSet>
		</Layout>
	);
}

export default Detail;
