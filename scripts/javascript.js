console.log("JavaScript Loaded");

var url = "";
var user = "";
var pass = "";
var contractTypeList = ""
var month = ""

var setValues = function(){
	url = $("#url").val();
	user = $("#user").val();
	pass = $("#pass").val();
	$('input[name=contractType]').each(function(){
		contractTypeList = this.checked ? contractTypeList.concat($(this).val(), " ") : contractTypeList.concat("");
	});
	month = $("select[name=month]").val();
};

$(document).ready(function(){
	$("#rateForm").submit(function (e){
		 e.preventDefault();
	});
});

$(document).ready(function(){
	$("#buttSubmit").click(function(){
		setValues();
		console.log(url + user + pass + contractTypeList + month);
	});
});
