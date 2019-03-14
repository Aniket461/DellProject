var express= require('express');

var router = express.Router();

var Data = require('./models/data');




router.get('/', function(req,res){


res.render('index',{

	test:"home page"
});

});



router.get('/check', function(req,res){


res.render('Check');
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


  				var data = new Data({

  					name: name,
  					zipcode: zipcode,
  					size: size,
  					bedroom: bedroom,
  					
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