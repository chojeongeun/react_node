import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
	apiKey: 'AIzaSyCKhAOwsU6EOZ-O4WxDEIvzoDxp2QGes-U',
	authDomain: 'je0725.firebaseapp.com',
	projectId: 'je0725',
	storageBucket: 'je0725.appspot.com',
	messagingSenderId: '577855993462',
	appId: '1:577855993462:web:277308346627ed03e79157',
};

firebase.initializeApp(firebaseConfig);

export default firebase;
