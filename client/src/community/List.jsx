import Layout from '../common/Layout';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Item = styled.article`
	width: 100%;
	padding: 30px 40px;
	background: #fff;
	box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.02);
	margin-bottom: 50px;
`;

function List() {
	const [Posts, setPosts] = useState([]);

	useEffect(() => {
		axios.get('/api/community/read').then((res) => {
			console.log(res);
			setPosts(res.data.communityList);
		});
	}, []);
	return (
		<Layout name={'List'}>
			{Posts.map((post) => {
				return (
					<Item key={post._id}>
						<h2>
							<Link to={`/detail/${post.communityNum}`}>{post.title}</Link>
						</h2>
					</Item>
				);
			})}
		</Layout>
	);
}

export default List;

//데이터 불러오는건 list 컴포넌트에서
//3000->5000포트로 부를떄 중개서버가 필요해서 api가 필요함
//프록시
