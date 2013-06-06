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

var loggingEnabled = true;

/**
 * returns the suffix of the pathname
 * @param pathname
 *      name of the path of the file
 * @return
 *      the suffix of the pathname when the file has a suffix, "" else
 */
function getSuffix(pathname) {
    var liod = pathname.lastIndexOf(".");
    if (liod != -1) {
        return pathname.substr(pathname.lastIndexOf(".") + 1, pathname.length);
    } else {
        return "";
    }
}

/**
 * checks whether haystack starts with start
 * @param haystack
 *      string to check
 * @param start
 *      string to compare with
 * @return
 *      true when haystack starts with start, false else
 */
function startsWith(haystack, start) {
    if ((typeof (haystack) == 'string') && (typeof (start) == 'string')) {
        return (haystack.substring(0, start.length).indexOf(start) != -1);
    }
    return false;
}

/**
 * returns the file name without leading "/"
 * @param pathname
 *      name of the path of the file
 * @return
 *      the file name without leading "/"
 */
function getFileName(pathname) {
    if (startsWith(pathname, "/")) {
        return pathname.substr(1, pathname.length);
    } else {
        return pathname;
    }
}

/**
 * returns a random number in between [min, max]
 * @param min
 *      min value
 * @param max
 *      max value
 * @return
 *      a random number in between [min, max]
 **/
function getRandom(min, max) { 
    if (min == max) {
        return min;
    } else if (min > max) {
        var tmp = max;
        max = min;
        min = max;
    }
    return (min + parseInt(Math.random() * (max - min + 1)));
}

/**
 * @description see log, difference: logs everytime
 */
function logX() {
    var ltmp = loggingEnabled;
    loggingEnabled = true;
    log(arguments);
    loggingEnabled = ltmp;
}

/**
 * @description Logs given arguments -- uses console.log
 * @param
 *     any console.log-valid arguments
 * @return
 *     true if window.console exists and arguments have been logged, false else
 */
function log() {
    if (loggingEnabled && console) {
        try {
            console && console.log.apply(console, Array.prototype.slice.call(arguments));
        } catch (err) {
            console.log(err);
        }
        return true;
    }
    return false;
}

// exports
exports.getSuffix = getSuffix;
exports.startsWith = startsWith;
exports.getFileName = getFileName;
exports.getRandom = getRandom;
exports.logX = logX;
exports.log = log;
