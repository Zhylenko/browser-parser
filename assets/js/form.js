$(document).ready(function () {

	$("form").submit(function(event) {

		event.preventDefault();

		$.ajax({
			type: $(this).attr('method'),
			url: $(this).attr('action'),
			data: new FormData(this),
			contentType: false,
			cache: false,
			
			processData: false,
			beforeSend: function(){
   				$("form button").prop("disabled", true);
   			},
			success: function(result) {

				console.log(result);
				json = JSON.parse(result);
				
				if (json.url) setTimeout(redirect, 1500, json.url);
				
				switch(json.type){
					case 'success': 
						$(".result-text").css({"color": "#44944A"});
						break;
					case 'warning': 
						$(".result-text").css({"color": "#F3A505"});
						break;
					case 'error': 
						$(".result-text").css({"color": "#F13A13"});
						if(window.grecaptcha) {
						  	grecaptcha.reset();
						}
						break;
				}

				$(".result-text").html(json.message);
				$("form button").prop("disabled", false);
			}
		});
	});	

});

function redirect(url) {
	window.open(url, "_blank");
}