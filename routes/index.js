var mongoose = require( 'mongoose' );
var Quote     = mongoose.model( 'Quote' );
var utils    = require( 'connect' ).utils;

exports.index = function ( req, res, next ){
  var user_id = req.cookies ?
    req.cookies.user_id : undefined;

  Quote.
    find({ user_id : user_id }).
    sort( '-updated_at' ).
    exec( function ( err, quotes ){
      if( err ) return next( err );

      res.render( 'index', {
          title : 'Express Todo Example',
          quotes : quotes
      });
    });
};

exports.create = function ( req, res, next ){
  new Quote({
      user_id    : req.cookies.user_id,
      content    : req.body.content,
      author      : req.body.author,
      updated_at : Date.now()
  }).save( function ( err, quote, count ){
    if( err ) return next( err );

    res.redirect( '/' );
  });
};

exports.destroy = function ( req, res, next ){
  Quote.findById( req.params.id, function ( err, quote ){
    var user_id = req.cookies ?
      req.cookies.user_id : undefined;

    if( quote.user_id !== req.cookies.user_id ){
      return utils.forbidden( res );
    }

    quote.remove( function ( err, quote ){
      if( err ) return next( err );

      res.redirect( '/' );
    });
  });
};
