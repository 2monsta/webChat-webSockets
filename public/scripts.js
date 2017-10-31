$("document").ready(()=>{
	var name = ""

	$(".join").click(()=>{
		$('#myModal').modal('show');
	});
	$("#log-in-form").submit((e)=>{
		e.preventDefault();
		name = $("#userName").val();
		$('#myModal').modal('hide');
	});

	// connect to the port first
	var socketUrl = "http://127.0.0.1:8080";
	//send connection back to index.js
	var socketio = io.connect(socketUrl);
	socketio.emit("nameToServer", name);
	socketio.on("nameToEveryone", (users)=>{
		var userHTML = ""
		users.map((user)=>{
			userHTML += `<li>${user}</li>`
		});
		$(".connected-user").append(userHTML);
	});
	

});