import { useState, useEffect } from 'react';
import Layout from '../common/Layout';
import { useNavigate } from 'react-router-dom';
import firebase from '../firebase';

function Login() {
	const navigate = useNavigate();
	const [Email, setEmail] = useState('');
	const [Pwd, setPwd] = useState('');
	const [Err, setErr] = useState('');

	const handleLogin = async () => {
		if (!(Email && Pwd)) return alert('모든 값을 입력하세요.');

		try {
			await firebase.auth().signInWithEmailAndPassword(Email, Pwd);
			navigate('/');
		} catch (err) {
			//console.log(err.code);
			if (err.code === 'auth/user-not-found') setErr('존재하지 않는 이메일입니다.');
			else if (err.code === 'auth/wrong-password') setErr('비밀번호 정보가 일치하지 않습니다.');
			else setErr('로그인에 실패했습니다.');
		}
	};

	useEffect(() => {
		console.log(Err);
	}, [Err]);

	return (
		<Layout name={'Login'}>
			<input
				type='email'
				value={Email}
				onChange={(e) => setEmail(e.target.value)}
				placeholder='이메일 주소를 입력하세요.'
			/>
			<input
				type='password'
				value={Pwd}
				onChange={(e) => setPwd(e.target.value)}
				placeholder='비밀번호를 입력하세요.'
			/>

			<nav>
				<button onClick={handleLogin}>로그인</button>
				<button onClick={() => navigate('/join')}>회원가입</button>
			</nav>
			{Err !== '' && <p>{Err}</p>}
		</Layout>
	);
}

export default Login;
