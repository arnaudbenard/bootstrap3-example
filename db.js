var mongoose = require( 'mongoose' );
var Schema   = mongoose.Schema;
 
var quoteSchema = new Schema({
    user_id    : String,
    content    : String,
    author    : String,
    updated_at : Date
});
 
mongoose.model( 'quote', bookSchema );
 
mongoose.connect( 'mongodb://localhost/express-todo' );