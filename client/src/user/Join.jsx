import Layout from '../common/Layout';
import { useState } from 'react';
import firebase from '../firebase';

function Join() {
	const [Email, setEmail] = useState('');
	const [Pwd1, setPwd1] = useState('');
	const [Pwd2, setPwd2] = useState('');
	const [Name, setName] = useState('');

	const handleJoin = async () => {
		if (!(Name && Email && Pwd1 && Pwd2)) return alert('모든 항목을 입력하세요.');
		if (Pwd1 !== Pwd2) return alert('비밀번호 2개를 동일하게 입력하세요.');

		//위의 조건을 통과하면 필요한 정보값을 firebase에 등록 처리
		const createdUser = await firebase.auth().createUserWithEmailAndPassword(Email, Pwd1);
		await createdUser.user.updateProfile({ displayName: Name });
		console.log(createdUser.user);
	};

	return (
		<Layout name={'Join'}>
			<input
				type='email'
				value={Email}
				placeholder='이메일 주소를 입력하세요.'
				onChange={(e) => setEmail(e.target.value)}
			/>
			<input
				type='password'
				value={Pwd1}
				placeholder='비밀번호를 입력하세요.'
				onChange={(e) => setPwd1(e.target.value)}
			/>
			<input
				type='password'
				value={Pwd2}
				placeholder='비밀번호를 재입력하세요.'
				onChange={(e) => setPwd2(e.target.value)}
			/>
			<input
				type='text'
				value={Name}
				placeholder='사용자 이름을 입력하세요.'
				onChange={(e) => setName(e.target.value)}
			/>
			<button onClick={handleJoin}>회원가입</button>
		</Layout>
	);
}

export default Join;
