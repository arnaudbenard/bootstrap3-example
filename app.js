/**
 * Module dependencies.
 */

 var express = require("express"),
	path = require('path'),
	engine = require('ejs-locals');

 var app = express();

// mongoose setup
require( './db' );

var routes = require( './routes' );

// use ejs-locals for all ejs templates
app.engine('ejs', engine);

// Configuration for all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use( express.cookieParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('less-middleware')({ src: __dirname + '/public' }));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Routes
app.get( '/', routes.index );
app.post( '/create', routes.create );
app.get( '/destroy/:id', routes.destroy );

app.listen( 3000, '127.0.0.1', function (){
	console.log( 'Express server listening' );
});