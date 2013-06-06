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

var fs = require("fs"),
    utils = require('./utils'),
    variables = require('./variables');

/**
 * start request handler - delivers index.html
 * @param response
 *      response to write to
 */
function start(response) {
    utils.log("Request handler 'start' was called.");

    // list all files in current directory
    /*
    fs.readdir(process.cwd(), function (err, files) {
	if (err) {
	    console.log(err);
	    return;
	}
	console.log(files);
    });
    */

    fs.readFile(variables.clientFolder + "client/index.html", "binary", function (error, file) {
        if (error) {
            response.writeHead(500, {
                "Content-Type": "text/plain"
            });
            response.write(error + "\n");
            response.end();
        } else {
            response.writeHead(200, {
                "Content-Type": "text/html"
            });
            response.write(file);
            response.end();
        }
    });
}

/**
 * file request handler - delivers a file from the file system
 * @param response
 *      response to write to
 * @param filename
 *      name of the file to display
 */
function file(response, filename) {
    utils.log("Request handler 'file' was called. Trying to deliver file '" + filename + "'");
    fs.readFile(variables.clientFolder + "client/" + filename, "binary", function (error, file) {
        if (error) {
            utils.log(error);
            response.writeHead(500, {
                "Content-Type": "text/plain"
            });
            response.write(error + "\n");
            response.end();
        } else {
            var mimetype = variables.mimetypes[utils.getSuffix(filename)];
            if (mimetype != undefined) {
                response.writeHead(200, {
                    "Content-Type": mimetype
                });
                response.write(file, "binary");
                response.end();
            } else {
                error404(response);
            }
        }
    });
}

/**
 * error404 request handler - writes an error 404
 * @param response
 *      response to write to
 */
function error404(response) {
    utils.log("Request handler 'error404' was called.");
    response.writeHead(404, {
        "Content-Type": "text/plain"
    });
    response.write("404 Not found");
    response.end();
}

// exports
exports.start = start;
exports.file = file;
exports.error404 = error404;
