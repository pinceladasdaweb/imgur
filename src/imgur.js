/*jslint browser: true, debug: true*/
/*global define, module, exports*/
(function (root, factory) {
    "use strict";
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.Imgur = factory();
    }
}(this, function () {
    "use strict";
    var Imgur = function (options) {
        if (!this || !(this instanceof Imgur)) {
            return new Imgur(options);
        }

        if (!options) {
            options = {};
        }

        if (!options.clientid) {
            throw 'Provide a valid Client Id here: http://api.imgur.com/';
        }

        this.clientid = options.clientid;
        this.endpoint = 'https://api.imgur.com/3/image';
        this.callback = options.callback || function () {};
        this.dropzone = document.querySelectorAll('.dropzone');

        this.run();
    };

    Imgur.prototype = {
        createEls: function (name, props, text) {
            var el = document.createElement(name), p;
            for (p in props) {
                if (props.hasOwnProperty(p)) {
                    el[p] = props[p];
                }
            }
            if (text) {
                el.appendChild(document.createTextNode(text));
            }
            return el;
        },
        createDragZone: function () {
            var p, input;

            p     = this.createEls('p', {}, 'Drag your files here or click in this area.');
            input = this.createEls('input', {type: 'file', accept: 'image/*'});

            Array.prototype.forEach.call(this.dropzone, function (zone) {
                zone.appendChild(p);
                zone.appendChild(input);
                this.upload(zone);
            }.bind(this));
        },
        post: function (path, data, callback) {
            var xhttp = new XMLHttpRequest();

            xhttp.open('POST', path, true);
            xhttp.setRequestHeader('Authorization', 'Client-ID ' + this.clientid);
            xhttp.onreadystatechange = function () {
                if (this.readyState === 4) {
                    if (this.status >= 200 && this.status < 400) {
                        var response = '';
                        try {
                            response = JSON.parse(this.responseText);
                        } catch (err) {
                            response = this.responseText;
                        }
                        callback.call(window, response);
                    } else {
                        throw new Error(this.status + " - " + this.statusText);
                    }
                }
            };
            xhttp.send(data);
            xhttp = null;
        },
        upload: function (zone) {
            var file, formData, target, i, len;

            zone.addEventListener('change', function (e) {
                if (e.target && e.target.nodeName === 'INPUT') {
                    target = e.target.files;

                    for (i = 0, len = target.length; i < len; i += 1) {
                        file = target[i];
                        if (file.type.match(/image/)) {
                            formData = new FormData();
                            formData.append('image', file);

                            this.post(this.endpoint, formData, function (data) {
                                this.callback(data);
                            }.bind(this));
                        } else {

                        }
                    }
                }
            }.bind(this), false);
        },
        run: function () {
            this.createDragZone();
        }
    };

    return Imgur;
}));