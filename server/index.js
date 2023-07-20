const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const app = express();
const port = 5000;
const { Post } = require('./model/postSchema.js');

//클라이언트로 부터 보내진 데이터를 전달받도록 설정 (body-parser)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//express에서 react안쪽 build폴더까지의 경로를 static으로 지정
app.use(express.static(path.join(__dirname, '../client/build')));

app.listen(port, () => {
	//db설정하기 위해 미리 설정해둠
	mongoose
		.connect('mongodb+srv://juy0816:!abcd1234@cluster0.e6eepiz.mongodb.net/')
		//접속 성공시
		.then(() => console.log(`Server app listening on port ${port} with MongoDB`))
		//접속 실패시
		.catch((err) => console.log(err));
});
app.get('/', (req, res) => {
	//서버에서 5000포트로 접속하면 static폴더로 지정되어 있는 build안쪽의 index.html을 화면에 내보냄
	res.sendFile(path.join(__dirname, '../client/build/index.html'));
});
//어떤 URL에서 접속하더라도 화면이 뜨도록 설정
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

//create
app.post('/api/create', (req, res) => {
	//PostSchema가 적용된 Post모델 생성자를 통해 저장 모델 인스턴스 생성
	const PostModel = new Post({
		title: req.body.title,
		content: req.body.content,
	});

	//생성된 모델 인스턴스로 부터 save명령어로 DB저장 (Promise반환)
	PostModel.save()
		.then(() => res.json({ success: true }))
		.catch(() => res.json({ success: false }));
});

//read
app.post('/api/read', (req, res) => {
	Post.find()
		.exec()
		.then((doc) => {
			console.log(doc);
			res.json({ success: true, communityList: doc });
		})
		.catch((err) => {
			console.log(err);
			res.json({ success: false });
		});
});
