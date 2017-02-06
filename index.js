import server from './server-assets/config/dev-server'

let mongoose = require('mongoose')
let connection = mongoose.connection;

mongoose.connect(process.env.CONNECTIONSTRING);


connection.once('open', function () {
	server.listen(process.env.PORT, function () {
		console.log(`Running on port: ${process.env.PORT}`);
	})
});




