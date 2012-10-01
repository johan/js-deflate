var retval = importScripts('rawdeflate.js');
var retval = importScripts('rawinflate.js');

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

//var running = false;

//addEventListener('message', function(event) {
//    // doesn't matter what the message is, just toggle the worker
//    if (running == false) {
//        running = true;
//        //run();
//    } else {
//        running = false;
//    }
//    postMessage('Running: ' + running + ' imported: ' + retval);
//}, false);

//function run() {
//    var n = 1;
//    search: while (running) {
//        n += 1;
//        for (var i = 2; i <= Math.sqrt(n); i += 1)
//            if (n % i == 0)
//                continue search;
//        // found a prime!
//        postMessage(n);
//    }
//}
