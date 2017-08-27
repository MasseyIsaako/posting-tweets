// Calling ajax on form submission, dependant on validation.
$("#postTweet").submit(function(event){
	
	// Prevent form submission
	event.preventDefault();

	// Getting Information from Form
	var value = $("#tweet").val();
	var url = "http://localhost:3000";
	
	// Validation
	if(value.length === 0){
		$("#search").css("border-color", "red");
		$(".btn-primary").css("background-color", "red");
		$("#error-message")[0].innerText = "";
		$("#error-message")[0].innerText = "Please type in a tweet";
		return;

	} else if(value.length >= 141){
		$("#search").css("border-color", "red");
		$(".btn-primary").css("background-color", "red");
		$("#error-message")[0].innerText = "";
		$("#error-message")[0].innerText = "Must be less than 140 characters";
		return;

	} else{
		$("#search").css("border-color", "#999999");
		$("#error-message")[0].innerText = "";
		$(".btn-primary").css("background-color", "#286090");
		url += "/send=" + value;
	}

	$.ajax({
		url: url,
		type: "post",
		dataType: "json",
		success: function(DataFromJSON){
			$("#result-message").text("Your message: " + value + " - has been sent.");
		}, error: function(){
			console.log("Error, server not responding.");
		}
	});
});

// Opening Explanation Panel
$("#question").click(function(){
	$("#overlay").fadeIn(1000);
});

// Closing Explanation Panel
$("#close").click(function(){
	$("#overlay").fadeOut(1000);
});