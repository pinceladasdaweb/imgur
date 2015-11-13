# Imgur
> Upload images to Imgur via JavaScript.

## Demo
View demo [here](http://www.pinceladasdaweb.com.br/blog/uploads/imgur/).

## Getting Started

```bash
# Get the latest snapshot
$ git clone git@github.com:pinceladasdaweb/imgur.git
```

The script depends on the following HTML markup:

```html
<div class="dropzone"></div>
```

Add the following css before your ```</head>``` tag:

```html
<script src="path/to/imgur.min.css"></script>
```

Add the following javascript before your ```</body>``` tag:

```html
<script src="path/to/imgur.min.js"></script>
<script>
    var callback = function (res) {
        if (res.success === true) {
            console.log(res.data.link);
        }
    };

    new Imgur({
        clientid: 'xxxxxxxxxxxxxxxxx',
        callback: callback
    });
</script>
```

Loading Imgur via AMD (require.js):

```html
<script>
require(["path/to/imgur.min.js"], function(Imgur) {
    var callback = function (res) {
        if (res.success === true) {
            console.log(res.data.link);
        }
    };

    new Imgur({
        clientid: 'xxxxxxxxxxxxxxxxx',
        callback: callback
    });
});
</script>
```

The script expect the following values:

| Value                              | Description                                                 |
| ---------------------------------- |:-----------------------------------------------------------:|
| **clientid**                       | Your Client-ID. Get here [http://api.imgur.com/](http://api.imgur.com/)|
| **callback**                       | Calllback to run after the success upload                   |

##Browser Support

![IE](https://raw.githubusercontent.com/alrra/browser-logos/master/internet-explorer/internet-explorer_48x48.png) | ![Chrome](https://raw.githubusercontent.com/alrra/browser-logos/master/chrome/chrome_48x48.png) | ![Firefox](https://raw.githubusercontent.com/alrra/browser-logos/master/firefox/firefox_48x48.png) | ![Opera](https://raw.githubusercontent.com/alrra/browser-logos/master/opera/opera_48x48.png) | ![Safari](https://raw.githubusercontent.com/alrra/browser-logos/master/safari/safari_48x48.png)
--- | --- | --- | --- | --- |
IE 10+ ✔ | Latest ✔ | Latest ✔ | Latest ✔ | Latest ✔ |

## Contributing

Check [CONTRIBUTING.md](CONTRIBUTING.md) for more information.

## History

Check [Releases](https://github.com/pinceladasdaweb/imgur/releases) for detailed changelog.

## License

[MIT](LICENSE)