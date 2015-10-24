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

![IE](https://cloud.githubusercontent.com/assets/398893/3528325/20373e76-078e-11e4-8e3a-1cb86cf506f0.png) | ![Chrome](https://cloud.githubusercontent.com/assets/398893/3528328/23bc7bc4-078e-11e4-8752-ba2809bf5cce.png) | ![Firefox](https://cloud.githubusercontent.com/assets/398893/3528329/26283ab0-078e-11e4-84d4-db2cf1009953.png) | ![Opera](https://cloud.githubusercontent.com/assets/398893/3528330/27ec9fa8-078e-11e4-95cb-709fd11dac16.png) | ![Safari](https://cloud.githubusercontent.com/assets/398893/3528331/29df8618-078e-11e4-8e3e-ed8ac738693f.png)
--- | --- | --- | --- | --- |
IE 10+ ✔ | Latest ✔ | Latest ✔ | Latest ✔ | Latest ✔ |

## Contributing

Check [CONTRIBUTING.md](CONTRIBUTING.md) for more information.

## History

Check [Releases](https://github.com/pinceladasdaweb/imgur/releases) for detailed changelog.

## License

[MIT](LICENSE)