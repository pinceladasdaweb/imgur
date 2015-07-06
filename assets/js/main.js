requirejs.config({
	paths: {
		app: 'app'
	}
});

requirejs(['app'], function( Imgur ){

	Imgur.init();

});