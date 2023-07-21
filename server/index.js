const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const app = express();
const port = 5000;
const { Post } = require('./model/postSchema.js');
const { Counter } = require('./model/counterSchema.js');

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
//글 저장 작업 흐름
//Counter모델에서부터 글 번호 가져옴 -> body-parser로 제목, 본문 가져와서 글 번호를 추가한 후 모델 인스턴스 저장
//저장이 완료되면 카운터 모델에 있는 글번호 값을 증가
//findone은 특정한 다큐먼트 하나를 콕 집는거기때문에 조건이 필요함!
app.post('/api/create', (req, res) => {
	Counter.findOne({ name: 'counter' })
		.exec()
		.then((doc) => {
			const PostModel = new Post({
				title: req.body.title,
				content: req.body.content,
				communityNum: doc.communityNum,
			});

			PostModel.save().then(() => {
				//update : $inc(증가), $dec(감소), $set(새로운값으로 변경)
				Counter.updateOne({ name: 'counter' }, { $inc: { communityNum: 1 } })
					.then(() => {
						res.json({ success: true });
					})
					.catch(() => res.json({ success: false }));
			});
		});
});

//read
app.post('/api/read', (req, res) => {
	Post.find() //호출
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
