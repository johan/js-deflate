importScripts('rawdeflate.js');
importScripts('rawinflate.js');

// When run as a web worker, respond to messages by deflating them
addEventListener('message', function (e) {
    var type = e.data.type;
    if (e.data.type === 'deflate')
        e.data.data = RawDeflate.deflate(e.data.data);
    else if (e.data.type === 'inflate')
        e.data.data = RawDeflate.inflate(e.data.data);

    //Return processed message
    postMessage(e.data);

}, false);

self.addEventListener("connect", function (e) {
    var port = e.ports[0];
    port.addEventListener('message', function (e) {
        if (e.data.type === 'deflate') 
            e.data.data = RawDeflate.deflate(e.data.data);
        else if (e.data.type === 'inflate')
            e.data.data = RawDeflate.inflate(e.data.data);

        //Return processed message
        port.postMessage(e.data);
    }, false);
    port.start();
}, false);
