const express = require('express');
const router = express.Router();
const { Post } = require('../model/postSchema.js');
const { Counter } = require('../model/counterSchema.js');

//글저장 라우터
router.post('/create', (req, res) => {
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

//목록 출력 라우터
router.get('/read', (req, res) => {
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

//상세페이지 출력 라우터
router.post('/detail', (req, res) => {
	Post.findOne({ communityNum: req.body.id })
		.exec()
		.then((doc) => res.json({ success: true, detail: doc }))
		.catch((err) => res.json({ success: false, err: err }));
});

module.exports = router;
