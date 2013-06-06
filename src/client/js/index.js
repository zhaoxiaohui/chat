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
(function ($) {
    var socket;
    var id;
    var activeUsers = 0;
    var users = new Array();
    var userNames = new Array();

	/**
	 * scrolls down
	 */
	function scrollDown() {
		$(document).scrollTop($(document).height());
	}

    function printStatusMessage(statusMsg) {
        $('#messages').append("<div class=\"clear statusMessage\">[INFO] <span class=\"status\">" + statusMsg + "</span></div>");
		scrollDown();
    }

	function updateUserlistView() {
		$('#userlistCount').html(activeUsers + "");
		try {
			$('#userlistview').listview('refresh');
		} catch (e) {
			// not yet initialized
		}
	}

    function updateUserList() {
		$("#currentName").html("Your current name is '" + userNames[users.indexOf(id)] + "'");
        $('#userlistview').html("");
        for (var i = 0; i < users.length; ++i) {
            var toAppend = "<li>" + formatName(userNames[i], users[i] == id) + "</li>";
            $('#userlistview').append(toAppend);
        }
		updateUserlistView();
    }

    /**
     * initializes the socket connection
     */
    function initSockets() {
        socket = io.connect(URL, {
                port: PORT
            });
        socket.on('socketId', function (msg) {
            activeUsers = msg.activeClients;
            id = msg.id;
            userNames = msg.clientNames;
            users = msg.clients;
            updateUserList();
            setupHandlers();
        });
        socket.on('userConnected', function (msg) {
            activeUsers = msg.activeClients;
            if (users.indexOf(msg.id) == -1) {
                userNames.push(msg.name);
                users.push(msg.id);
                printStatusMessage("'" + userNames[users.indexOf(msg.id)] + "' connected");
            }
            updateUserList();
        });
        socket.on('userDisconnected', function (msg) {
            printStatusMessage("'" + userNames[users.indexOf(msg.id)] + "' disconnected");
            activeUsers = msg.activeClients;
            userNames.splice(users.indexOf(msg.id), 1);
            users.splice(users.indexOf(msg.id), 1);
            updateUserList();
        });
        socket.on('chatUpdate', function (msg) {
            $('#messages').append(formatMsg(getFormattedTimeString(msg.date), userNames[users.indexOf(msg.id)], msg.msg, msg.id == id));
			scrollDown();
        });
        socket.on('nameChange', function (msg) {
            printStatusMessage("'" + userNames[users.indexOf(msg.id)] + "' set name to '" + msg.name + "'");
            userNames[users.indexOf(msg.id)] = msg.name;
            updateUserList();
            if (msg.id == id) {
                $("#popupName").show();
            }
        });
    }

    /**
     * submit message handler
     */
    function submitMessage() {
        var msg = filter($('#newMessage').val().substr(0, 100));
        if (msg && msg != "") {
            socket.emit('chatUpdate', {
                    msg: msg
                });
            $('#newMessage').val('');
        }
        $("#newMessage").focus();
        return false;
    }

    /**
     * submit name handler
     */
    function submitName() {
        var name = filter($('#newName').val().substr(0, 100));
        if (name && name != "") {
            socket.emit('nameChange', {
                    name: name
                });
            $('#newName').val('');
        }
        $("#newName").focus();
        return true;
    }

    /**
     * sets up handlers
     */
    function setupHandlers() {
        $(document).click(function () {
            $("#popupName").hide();
        });

        $('#loading').hide();
        $('#messagesAndSend').show();

        $('#buttonSendMessage').click(submitMessage);
        $('#newMessage').keyup(function (e) {
            if (e.keyCode == 13) {
                submitMessage();
            }
        });

        $('#buttonSendName').click(submitName);
        $('#newName').keyup(function (e) {
            if (e.keyCode == 13) {
                submitName();
            }
        });

        printStatusMessage("Welcome to the Chat!");

		$('#chat').on('pageshow', function() {
			scrollDown();
        	printStatusMessage("Your current name is '" + userNames[users.indexOf(id)] + "'");
        	$('#newMessage').focus();
		});

		$('#changename').on('pageshow', function() {
        	$('#newName').focus();
		});
    }

    // DOM ready
    $(document).ready(function () {
        initSockets();
    });
})(jQuery);
