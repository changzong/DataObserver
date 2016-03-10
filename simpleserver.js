var express = require('express');
var mysql = require('mysql');

var conn = mysql.createConnection({
    host: '10.33.64.15',
    user: 'bigdata',
    password: '4WsiKvxhi9pITBfO4Mc8',
    database:'report',
    port: 3306
});
conn.connect();
conn.query('SELECT * from TableManager', function(err, rows, fields) {
    if (err) throw err;
    //console.log('表管理列表: ', rows[0]);
	var app = express();
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
	var server = app.listen(8182, function () {
	  var host = server.address().address;
	  var port = server.address().port;

	  console.log('Example app listening at port %s', port);
	});
});
conn.end();


