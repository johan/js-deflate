
importScripts('rawdeflate.js');

// When run as a web worker, respond to messages by deflating them
addEventListener('message', function(e) {
    postMessage(RawDeflate.deflate(e.data));
}, false);

self.addEventListener("connect", function (e) {
    var port = e.ports[0];
    port.addEventListener('message', function (e) {
        port.postMessage(RawDeflate.deflate(e.data));
    }, false);
    port.start();
}, false);