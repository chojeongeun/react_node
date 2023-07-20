const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
	app.use(
		'/api',
		createProxyMiddleware({
			target: 'http://localhost:5000',
			changeOrigin: true,
		})
	);
};

//정해져있는 코드
