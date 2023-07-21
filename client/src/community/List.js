import Layout from '../common/Layout';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

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
					<article key={post._id}>
						<h2>
							<Link to={`/detail/${post.communityNum}`}>{post.title}</Link>
						</h2>
					</article>
				);
			})}
		</Layout>
	);
}

export default List;

//데이터 불러오는건 목록 컴포넌트에서
//3000->5000포트로 부를떄 중개서버가 필요해서 api가 필요함
//프록시
