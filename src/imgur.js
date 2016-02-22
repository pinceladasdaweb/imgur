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
        this.callback = options.callback || undefined;
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
        insertAfter: function (referenceNode, newNode) {
            referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
        },
        post: function (path, data, callback) {
            var xhttp = new XMLHttpRequest();

            xhttp.open('POST', path, true);
            xhttp.setRequestHeader('Authorization', 'Client-ID ' + this.clientid);
            xhttp.onreadystatechange = function () {
                if (this.readyState === 4) {
                    if (this.status >= 200 && this.status < 300) {
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
        createDragZone: function () {
            var p, input;

            p     = this.createEls('p', {}, 'Drag your files here or click in this area.');
            input = this.createEls('input', {type: 'file', accept: 'image/*'});

            Array.prototype.forEach.call(this.dropzone, function (zone) {
                zone.appendChild(p);
                zone.appendChild(input);
                this.status(zone);
                this.upload(zone);
            }.bind(this));
        },
        loading: function () {
            var div, img;

            div = this.createEls('div', {className: 'loading-modal'});
            img = this.createEls('img', {className: 'loading-image', src: './svg/loading-spin.svg'});

            div.appendChild(img);
            document.body.appendChild(div);
        },
        status: function (el) {
            var div = this.createEls('div', {className: 'status'});

            this.insertAfter(el, div);
        },
        matchFiles: function (file, zone) {
            var status = zone.nextSibling;

            if (file.type.match(/image/) && file.type !== 'image/svg+xml') {
                document.body.classList.add('busy');
                status.classList.remove('bg-success', 'bg-danger');
                status.innerHTML = '';

                var fd = new FormData();
                fd.append('image', file);

                this.post(this.endpoint, fd, function (data) {
                    document.body.classList.remove('busy');
                    typeof this.callback === 'function' && this.callback.call(this, data);
                }.bind(this));
            } else {
                status.classList.remove('bg-success');
                status.classList.add('bg-danger');
                status.innerHTML = 'Invalid archive';
            }
        },
        upload: function (zone) {
            var events = ['dragenter', 'dragleave', 'dragover', 'drop'],
                file, target, i, len;

            zone.addEventListener('change', function (e) {
                if (e.target && e.target.nodeName === 'INPUT' && e.target.type === 'file') {
                    target = e.target.files;

                    for (i = 0, len = target.length; i < len; i += 1) {
                        file = target[i];
                        this.matchFiles(file, zone);
                    }
                }
            }.bind(this), false);

            events.map(function (event) {
                zone.addEventListener(event, function (e) {
                    if (e.target && e.target.nodeName === 'INPUT' && e.target.type === 'file') {
                        if (event === 'dragleave' || event === 'drop') {
                            e.target.parentNode.classList.remove('dropzone-dragging');
                        } else {
                            e.target.parentNode.classList.add('dropzone-dragging');
                        }
                    }
                }, false);
            });
        },
        run: function () {
            var loadingModal = document.querySelector('.loading-modal');

            if (!loadingModal) {
                this.loading();
            }
            this.createDragZone();
        }
    };

    return Imgur;
}));