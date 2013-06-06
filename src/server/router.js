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

var utils = require('./utils'),
    variables = require('./variables');

/**
 * calls request handlers if available
 * @param pathname
 *      path name to check
 * @param response
 *      reponse to write to
 */
function route(pathname, response) {
    utils.log("About to route a request for '" + utils.getFileName(pathname) + "'");
    // check whether a request handler for the given pathname exists
    if (typeof variables.handle[pathname] === 'function') {
        utils.log("Delivering a handle");
        variables.handle[pathname](response);
        // check whether a file is requested
    } else if (variables.mimetypes[utils.getSuffix(pathname)] != undefined) {
        utils.log("Delivering a static file");
        variables.handle["file"](response, utils.getFileName(pathname))
    } else {
        utils.log("No request handler found for " + pathname);
        variables.handle["error404"](response);
    }
}

// exports
exports.route = route;