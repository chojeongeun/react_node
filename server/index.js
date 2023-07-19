const express = require('express');
const app = express();
const path = require('path');
const port = 5000;

//express에서 client 측 build 폴더까지의 경로를 static하게 지정
app.use(express.static(path.join(__dirname, '../client/build')));

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, '../client/build/index.html'));
});
//경로가 어떤게 들어와도 index.html로 보여줄거다
//404페이지 - 리액트는 단일페이지로 이상한 url로 들어오더라도 index.html을 보여주어야 404페이지를 보여주기 때문에 어떤게 들어와도 index.html로 설정하기

app.listen(port, () => {
	console.log(`Server app lisetening on port ${port}`);
});

//5000포트접속했을때 index.html로 화면을 출력하겠다
