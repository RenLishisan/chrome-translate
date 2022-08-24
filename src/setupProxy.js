const proxy = require('http-proxy-middleware')
module.exports = function(app) {
	app.use(
		proxy.createProxyMiddleware('/index', {  //`api`是需要转发的请求
			target: 'https://fanyi-api.baidu.com',  // 这里是接口服务器地址
			changeOrigin: true,
			pathRewrite: {'^/index': ''}
		})
	)
}
