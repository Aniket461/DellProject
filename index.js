var express= require('express');

var router = express.Router();

var Data = require('./models/data');
var zipcodes = require('zipcodes');





router.get('/', function(req,res){


res.render('index',{

	test:"home page"
});

});



router.get('/check', function(req,res){

 var zip = zipcodes.lookup(40010);
res.render('Check',{

zip: zip.latitude
	
});
});



//post check

router.post('/submit-check', function(req,res){

 var name = req.body.name;
 var zipcode = req.body.zipcode;
 var size = req.body.size;
 var bedroom = req.body.bedroom;



 req.checkBody('name', 'Name is required!').notEmpty();
 req.checkBody('zipcode', 'Zipcode is required!').notEmpty();
 req.checkBody('size', 'Please specify the size of property').notEmpty();
 req.checkBody('bedroom', 'Please specify number of bedrooms in your property').notEmpty();
 
 var errors = req.validationErrors();
  if(errors){

  	res.render('Check',{
  		errors:errors
  	});
  }
  else{

  	var zip = zipcodes.lookup(zipcode);

  	var latitude = zip.latitude;
  	var longitude = zip.longitude;

  	console.log(latitude);
  	console.log(longitude);




  				var data = new Data({

  					name: name,
  					zipcode: zipcode,
  					size: size,
  					bedroom: bedroom,
  					lat: latitude,
  					lon: longitude
  					
  				});

  				

  						data.save(function(err){

  							if(err) console.log(err);

  							else{

  								req.flash('success', 'Data added successfully. Please wait for prediction');
  								res.redirect('/check');
  							}

  						});

  					}
  					});
  				
  		
  





module.exports= router;