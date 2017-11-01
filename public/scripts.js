$("document").ready(()=>{
	// connect to the port first
	var socketUrl = "http://127.0.0.1:8080";
	var socketio = io.connect(socketUrl);
	var messageValue;
	var name;


	// if(name !=null && messageValue !=null){
	// 	socketConnectionName(name);
	// 	socketConnectionMesage(messageValue);
	// }

	function socketConnectionName(name){
		//send connection back to index.js
		socketio.emit("nameToServer", name);
		socketio.on("nameToEveryone", (users)=>{
			var userHTML = ""
			users.map((user)=>{
				userHTML += `<li>${user}</li>`
			});
			$(".connected-user").html(userHTML);
		});
	}

	function socketConnectionMesage(messageValue){
		var messageAndName = {
			name: name,
			message: messageValue
		}
		socketio.emit("messageToServer", messageAndName);
		socketio.on("messageToEveryone", (messages)=>{
			var messagesListHTML =`<li>${messages.message} -- ${messages.name}</li>`
			$(".messages-go").prepend(messagesListHTML);
		})
	}


	$(".join").click(()=>{
		$('#myModal').modal('show');
	});
	$("#log-in-form").submit((e)=>{
		e.preventDefault();
		name = $("#userName").val();
		$("#userName").val("");
		$('#myModal').modal('hide');
		socketConnectionName(name);
	});
	
	$("#message-form").submit((e)=>{
		e.preventDefault();
		messageValue = $(".input-message").val();
		$(".input-message").val("");
		// console.log(messageValue);
		socketConnectionMesage(messageValue);
	});

	
	
});