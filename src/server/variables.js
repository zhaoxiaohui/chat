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

var requestHandlers = require("./requestHandlers");

var URL = "localhost";
var PORT = 8181;
var clientFolder = "../";

// define request handlers
var handle = {};
handle["/"] = requestHandlers.start;
handle["file"] = requestHandlers.file;
handle["error404"] = requestHandlers.error404;

// define some file suffixes with according mimetypes
var mimetypes = {};
mimetypes["html"] = "text/html";
mimetypes["txt"] = "text/plain";
mimetypes["js"] = "text/javascript";
mimetypes["css"] = "text/css";
mimetypes["png"] = "image/png";
mimetypes["gif"] = "image/gif";
mimetypes["ico"] = "image/ico";
mimetypes["wav"] = "audio/wav";
mimetypes["mp3"] = "audio/mp3";
mimetypes["ogg"] = "audio/ogg";

// exports
exports.URL = URL;
exports.PORT = PORT;
exports.clientFolder = clientFolder;
exports.handle = handle;
exports.mimetypes = mimetypes;
