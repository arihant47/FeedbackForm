var express     = require("express");
var app         = express();
var bodyParser  = require("body-parser");
var mongoose    = require("mongoose");

//App Config 
mongoose.connect("mongodb://localhost/feedback_msgs");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

//Mongoose Model Config
var testerSchema = new mongoose.Schema({
	name: String,
	email: String,
	message: String,
	created: {type: Date, default: Date.now}
});
var Msg = mongoose.model("Msg", testerSchema);

//Main Route
app.get ("/", function(req, res){
	res.render("new");
});

//CREATE route (Add new feedback to the database) -->POST
app.post("/", function(req, res){
	//get data from the form and add to Message(Msg) array
	var name = req.body.name;
	var email = req.body.email;
	var message = req.body.message;
	var newMsg = {name: name, email: email, message: message}
	
	Msg.create(newMsg, function(err, newlyCreated){
		if(err) {
			console.log(err);
		} else {
			//redirect back to any page (Here redirecting to main route)
			res.redirect("/");
		}
	});	
});


app.listen(3000, function(){
	console.log("SERVER IS RUNNING");
});