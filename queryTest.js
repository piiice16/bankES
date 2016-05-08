var elasticsearch = require('elasticsearch');
var client = elasticsearch.Client({
	host: 'localhost:9200'
});

client.search({
	index: 'bank',
	type: 'account',
	body:{
		query:{
			multi_match: {
				query: 'Place',
				fields: ['address']
			}
		}
	}
}).then(function(res){
	var hits = res.hits.hits;
	console.log(hits);
}, function(error){
	console.log(error.message);
});
