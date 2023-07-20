/*
  table형식의 DB (SQL 표준문법을 통해 데이터 입출력) (예: Orachle, MySQL, MsSQL, MariaDB)
  JSON형식의 NoSQL DB (SQL 표준문법이 아닌 자스 구문으로 데이터 입출력) (MongoDB)
  -면접관들이 물어볼때 답변할줄 알아야함

  Model : DB에 저장되는 데이터 객체
  Schema: 데이터베이스에 저장될 자료형식이나 키값을 강제하는 시스템적인 틀
*/
const mongoose = require('mongoose');

//게시글 객체가 저장될 스키마 구조를 생성
const postSchema = new mongoose.Schema({
	title: String,
	content: String,
});

//게시글 스키마 구조가 적용된 모델 생성자를 만든 뒤 내보냄(export)
const Post = mongoose.model('Post', postSchema);
module.exports = { Post };
