var express = require('express');
var ejs = require('ejs');
var bodyParser = require('body-parser');

var elasticsearch = require('elasticsearch');
var client = elasticsearch.Client({
	host: 'localhost:9200'
});

var app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.engine('ejs', ejs.renderFile);

app.get('/', function(req, res){
	res.render('index.ejs', {
		query: '',
		fields: '',
		content: ''
	});
});

app.post('/', function(req, res){
	client.search({
		index: 'bank',
		type: 'account',
		body: {
			query: {
				multi_match: {
					query: req.body['input1'],
					fields: req.body['input2'].split(',')
				}
			}
		}
	}).then(function(response){
		var hits = response.hits.hits;
		var str = JSON.stringify(hits);
		console.log(hits);
		res.render('index.ejs', {
			query: req.body['input1'],
			fields: req.body['input2'],
			content: str
		});
	}, function(error){
		console.trace(error.message);
	});
});

app.listen(3000);
