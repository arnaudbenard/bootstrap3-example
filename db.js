var mongoose = require( 'mongoose' );
var Schema   = mongoose.Schema;

var Quote = new Schema({
	user_id		: String,
	content		: String,
	author		: String,
	updated_at	: Date
});

mongoose.model( 'Quote', Quote );

mongoose.connect( 'mongodb://localhost/express-todo' );