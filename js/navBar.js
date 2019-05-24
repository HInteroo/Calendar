var count = 0;
function toggleNav(){
	var nav = document.getElementById("navigationBar");
	nav.classList.toggle("navtoggle");
}

function toggleNavCalendar(){
	var nav = document.getElementById("navigationBar");
	nav.classList.toggle("navtoggle");
	var id = $("#calendar");
	if (count === 0){
		id.addClass('margin');
		$('.pages').css('margin-left','0');
		count= 1;
	}
	else{
		id.removeClass('margin');
		$('.pages').css('margin-left','-210px');
		count= 0;
	}
}
function ValidationEventForm(){
	var validation = true;
	var timeFormat = new RegExp('/^[1-9]{2}:[0-9]{2}([AaPp][Mm])$/');

	var Form = document.forms["EventForm"];

	for (var i = 0; i < Form.length-1; i++) {
		var id = Form[i].id;
		var stringID = '#' + id;
		var name = $(stringID);
		name.css('border-color','');
		if(name.val() === ''){
			name.css('border-color','#2faf49');
			validation = false;
		}
	}
	return validation;
}

function SignUpValidation(){
	var Form = document.forms["SignUpForm"]
	var x =  Form[2].value; 	//the value given/submited on the specify id
	var input = document.getElementById("CPassWord");
	if(x != Form[1].value){
		input.setCustomValidity('The two passwords must match.');
	}
	else{
		input.setCustomValidity('');
	}
}
function FormValidation(){
	var Form = document.forms["SignUpForm"]
	var x =  Form[2].value; 	//the value given/submited on the specify id
	var input = document.getElementById("CPassWord");
	if(x != Form[1].value){
		return false;
	}
	else{
		return true;
	}
}
