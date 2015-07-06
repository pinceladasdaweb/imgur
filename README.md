[Imgur Upload](http://www.pinceladasdaweb.com.br/blog/uploads/imgur/)
=================

Upload images to Imgur via JavaScript.

##How to use as a RequireJS module

Ĺoad RequireJs on your html file.

```html
<script type="text/javascript" src="path/to/require.js" data-main="path/to/your/main"></script>
```

Where main.js is like:

```js
requirejs.config({
	paths: {
		app: 'app'
	}
});

requirejs(['app'], function( Imgur ){

	Imgur.init();

});
```

##How to use without RequireJs

Load the app.js file on your html

```html
<script src="assets/js/app.js"></script>
```

Then call the function

```html
<script>
	Imgur();
</script>
```

##Important Note

On line 89 of the file app.js add the Client-ID of your app. You can pick it hem: [http://api.imgur.com/](http://api.imgur.com/).

##Browser Support

* IE10+
* Opera
* Google Chrome
* Safari
* Firefox
