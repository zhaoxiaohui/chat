/*
The MIT License (MIT)

Copyright (c) 2013 Denis Meyer, CallToPower Software

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

var http = require('http'),
    url = require("url"),
    utils = require('./utils'),
    variables = require("./variables"),
    router = require("./router");

// start server
var server = http.createServer(onRequest).listen(variables.PORT, variables.URL);
utils.logX("Server started on " + variables.URL + ":" + variables.PORT);

var io = require('socket.io').listen(server);
io.set('log level', 1); // 1 = errors, 2 = warnings + errors, 3 = info + warnings + errors
var activeClients = 0;
var clients = new Array();
var clientNames = new Array();

io.sockets.on('connection', function (socket) {
    ++activeClients;

    utils.log("Client with socket id " + socket.id + " connected. Active clients: " + activeClients);
	
	clientNames.push((socket.id + "").substr(0, 7));
	clients.push(socket.id);

    socket.on('disconnect', function () {
        --activeClients;
        utils.log("Client '" + clientNames[clients.indexOf(socket.id)] + "' (" + socket.id + ") disconnected. Active clients: " + activeClients);
		clientNames.splice(clients.indexOf(socket.id), 1);
		clients.splice(clients.indexOf(socket.id), 1);
        io.sockets.json.emit('userDisconnected', {
        	activeClients: activeClients,
            id: socket.id
        });
    });
    socket.on('nameChange', function (msg) {
		var name = msg.name.trim();
		name = (name.length > 20) ? name.substring(0, 20) : name;
		if(name && name != "") {
		    utils.log("[INFO] '" + clientNames[clients.indexOf(socket.id)] + "' (" + socket.id + ") set name to '" + name + "'");
		    clientNames[clients.indexOf(socket.id)] = name;
		    io.sockets.json.emit('nameChange', {
			    id: socket.id,
				name: name
		    });
		}
    });
    socket.on('chatUpdate', function (msg) {
		var date = new Date();
		utils.log("[MSG] " + socket.id + " (" + date + "): " + msg.msg);
		
		if(msg.msg && msg.msg.trim() != "") {
		    io.sockets.json.emit('chatUpdate', {
			    id: socket.id,
			    date: date,
			    msg: msg.msg.trim()
		    });
		}
    });
    socket.emit('socketId', {
        activeClients: activeClients,
        id: socket.id,
		clients: clients,
		clientNames: clientNames
    });
    io.sockets.json.emit('userConnected', {
        activeClients: activeClients,
        id: socket.id,
		name: clientNames[clients.indexOf(socket.id)]
    });
});

/**
 * on GET request
 * @param request
 *      request
 * @param response
 *      response
 */
function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname;
    utils.log("-----\nRequest for '" + pathname + "' received.");
    if (pathname.indexOf("..") != -1) {
        router.route("error404", response);
    } else {
        router.route(pathname, response);
    }
}
