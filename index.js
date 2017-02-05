import server from './server-assets/config/dev-server'

server.listen(process.env.PORT, function () {
	console.log(`Running on port: ${process.env.PORT}`);
})