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
var findReplace = [
    [/&/g, "&amp;"],
    [/</g, "&lt;"],
    [/>/g, "&gt;"],
    [/"/g, "&quot;"]
]; //" <- only for TextMate that does recognize the '/' in front of the quotation mark in the line above

/**
 * filters a string
 * @param str
 *      string to filter
 * @return
 *      a filtered string
 */

function filter(str) {
    for (var item in findReplace) {
        str = str.replace(findReplace[item][0], findReplace[item][1]);
    }
    return str;
}

/**
 * formats a name
 * @param name
 *      the name
 * @param own
 *      flag (true, false) whether the message is from oneself
 * @return
 *      a formatted message
 */

function formatName(name, own) {
    var nameClass = own ? "ownUsername" : "otherUsername";
    return "<span class=\"" + nameClass + "\">" + name + "</span>";
}

/**
 * formats a message
 * @param timeString
 *      the time
 * @param name
 *      name of the player
 * @param msg
 *      the message
 * @param own
 *      flag (true, false) whether the message is from oneself
 * @return
 *      a formatted message
 */

function formatMsg(timeString, name, msg, own) {
    var cssClass = own ? "floatRight clear" : "clear";
    var cssNameClass = own ? "ownUsername" : "otherUsername";
    var cssMsgClass = own ? "bubbledRight" : "bubbledLeft";
	return "<div class=\"formattedMessage " + cssClass + "\">" +
				"<span class=\"time\">" +
					timeString +
				"</span>" +
				" - " +
				"<span class=\"" + cssNameClass + "\">" +
					name +
				"</span>" +
			"</div>" +
			"<div class=\"" + cssMsgClass + "\">" +
				msg +
			"</div>";
}

/**
 * returns a time string
 * @return
 *      a time string
 */

function getTimeString() {
    var date = new Date();
    var h = date.getHours();
    var m = date.getMinutes();
    var s = date.getSeconds();
    return ((h < 10) ? ("0" + h) : h) + ":" + ((m < 10) ? ("0" + m) : m) + ":" + ((s < 10) ? ("0" + s) : s);
}

/**
 * returns a formatted time string
 * @param time
 *		date object
 * @return
 *      a time string
 */

function getFormattedTimeString(dateString) {
    var d = new Date(dateString);
    var h = d.getHours();
    var m = d.getMinutes();
    var s = d.getSeconds();
    return ((h < 10) ? ("0" + h) : h) + ":" + ((m < 10) ? ("0" + m) : m) + ":" + ((s < 10) ? ("0" + s) : s);
}

/**
 * checks whether num is in [lower, upper]
 * @param lower
 *      lower bound
 * @param upper
 *      upper bound
 * @return
 *      true when num is in [lower, upper], false else
 */

function inInterval(lower, upper, num) {
    return ((num >= lower) && (num <= upper));
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
