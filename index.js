module.exports = function apisWrapper(res){
	function parse(error,data){
		var code = 200;

		if(error){
			return res.status(error.code || 500).json({
				error: error.message ? error.message : 'An error came up'
			})
		}

		return res.json(data);
	}

	return function(callback){
		return require('domain')
			.create()
	        .on('error', function(error) {
	        	console.error('Error while parsing a result:')
	        	console.error(error.stack);
	          	return parse(error) 
	        })
			.run(function(){
				callback(parse)
			})
	}
}