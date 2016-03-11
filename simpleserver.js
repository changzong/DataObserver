var express = require('express');
var mysql = require('mysql');

var conn = mysql.createConnection({
    host: 'xxxx',
    user: 'xxxx',
    password: 'xxxx',
    database:'xxxx',
    port: 3306
});
conn.connect();
conn.query('SELECT * from TableManager', function(err, rows, fields) {
    if (err) throw err;
    //console.log('表管理列表: ', rows[0]);
	var app = express();
	var port = 8182;
	//var server = require('http').createServer(app);
	var io = require('socket.io').listen(app.listen(port));

	app.use('/src', express.static('src'));
	app.use('/lib', express.static('lib'));
	app.engine('html', require('ejs').renderFile);
	app.set('view engine', 'html');
	app.set('views', __dirname + '/')
	app.get('/', function(req, res) { 
		res.render('index');
	});
	app.get('/graph', function(req, res) { 
		res.render('graph');
	});
	app.get('/data', function(req, res) { 
		res.send(rows);
	});
	app.get('/msg', function(req, res) { 
		res.render('message');
	});
	console.log("监听端口： " + port);
	io.sockets.on('connection', function (socket) {
	    socket.emit('news', { message: '欢迎来聊天' });
	    socket.on('send', function (data) {
	        io.sockets.emit('news', data);
	    });
	});
});
conn.end();


