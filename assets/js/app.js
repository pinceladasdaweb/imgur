/*
--------------------------------
imgur Upload
--------------------------------
+ https://github.com/pinceladasdaweb/imgur-upload
+ version 1.0
+ Copyright 2013 Pedro Rogerio
+ Licensed under the MIT license

+ Documentation: https://github.com/pinceladasdaweb/imgur-upload
*/

var Imgur = (function (d) {
    "use strict";
    /*jslint browser: true*/
    var module = {
        xhr: function () {
            return new XMLHttpRequest();
        },
        create: function (name, props) {
            var el = d.createElement(name), p;
            for (p in props) {
                if (props.hasOwnProperty(p)) {
                    el[p] = props[p];
                }
            }
            return el;
        },
        remove: function (els) {
            while (els.hasChildNodes()) {
                els.removeChild(els.lastChild);
            }
        },
        bindEvent: function () {
            var fileinput = d.querySelector('#uploadBtn'),
                fileName  = d.querySelector('#uploadFile'),
                status    = d.querySelector('.status'),
                self      = this;

            fileinput.addEventListener('change', function (e) {
                var files = e.target.files, file, p, t, i, len;
                for (i = 0, len = files.length; i < len; i += 1) {
                    file = files[i];
                    if (file.type.match(/image.*/)) {
                        self.remove(status);
                        fileName.value = this.value;

                        p = self.create('p');
                        t = d.createTextNode("Uploading...");

                        p.appendChild(t);
                        status.appendChild(p);

                        self.upload(file);
                    } else {
                        self.remove(status);

                        p = self.create('p');
                        t = d.createTextNode("Invalid Archive");

                        p.appendChild(t);
                        status.appendChild(p);
                    }
                }
            }, false);
        },
        upload: function (file) {
            var self     = this,
                xhttp    = self.xhr(),
                status   = d.querySelector('.status'),
                fd       = new FormData();

            fd.append('image', file);
            xhttp.open('POST', 'https://api.imgur.com/3/image');
            xhttp.setRequestHeader('Authorization', 'Client-ID XXXXXXXXXXXXX'); //Get yout Client ID here: http://api.imgur.com/
            xhttp.onreadystatechange = function () {
                if (xhttp.status === 200 && xhttp.readyState === 4) {
                    var res = JSON.parse(xhttp.responseText), link, p, t;

                    self.remove(status);

                    link = res.data.link;
                    p    = self.create('p');
                    t    = d.createTextNode(link);

                    p.appendChild(t);
                    status.appendChild(p);
                }
            };
            xhttp.send(fd);
        },
        init: function () {
            module.bindEvent();
        }
    };

    return {
        init: module.init
    };
}(document));