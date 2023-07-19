import axios from 'axios';
import { useEffect } from 'react';

function App() {
	const item = { name: 'David' };

	useEffect(() => {
		axios
			.post('/api/send', item)
			.then((res) => {
				//서버쪽에서 응답이 성공적으로 넘어오면 해당 값을 콘솔로 출력
				console.log(res);
			})
			.catch((err) => console.log(err));
	}, []);

	return <h1>Hello2</h1>;
}

export default App;
