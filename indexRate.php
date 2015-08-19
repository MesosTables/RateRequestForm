<!doctype html>
<html>
<head>

  	<meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <title>Rate Look Up</title>

    <!-- Latest compiled and minified CSS -->
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css">

	<!-- Optional theme -->
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap-theme.min.css">

	<!-- Latest compiled and minified JavaScript -->
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js"></script>
  	<script type="text/javascript" src="http://code.jquery.com/jquery-latest.min.js"></script>
  	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
  	<script src="http://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.11.3.min.js"></script>


	<style type="text/css"> 
		.contentContainer {
 	 	 background-image:url("images/backgroundRoad.jpg");
 	 	 height:800px;
 	 	 width:100%;
 	 	 background-size: cover;
 	 	 background-position:center;
 	 	 padding-top:100px;
 	 	 }
 	 	 body{
 	 	 	font-family: Helvetica;
 	 	 }

 	 	 .center{

 	 	 	text-align:center;
 	 	 }
 	 	 .container{
 	 	 	padding-top:150px;
 	 	 }
 	 	 p{
 	 	 	padding: 20px 0 15px 0;
 	 	 }
 	 	 #submit{
 	 	 	margin-top:15px;
 	 	 	margin-bottom: 15px;
 	 	 }
 	 	 .result{
 	 	 	margin-top:20px;
 	 	 	display:none;
 	 	 }
 	 	 .error{
 	 	 	margin-top:20px;
 	 	 	display:none;
 	 	 }
 	 	 #link{
			float:left;
			text-decoration:none;

		}
		#link a{
			text-decoration:none;
			color:#2A5DB0;
		}
		#link:hover{
			color: #2B2B2B;
		}
		#whiteBackground{
			background-color:white;
			padding: 20px;
			border-radius:20px;
		}
	</style>
</head>

<body>
	<?php


		
	?>

	<div class=" container contentContainer" id = "topContainer">
		
		<div  class = "row">
		
			<div class ="col-md-6 col-md-offset-3 center" id="whiteBackground">
				<a id="link" href="http://mesostables.github.io/">MesosTables' Projects</a>
				<br />
				<h1 class="center">Rate Look Up</h1>
				<p class="lead center"> Enter any street address to find the Rate</p>
				<form>
					<div class="form-group">
						<input id="address" class="form-control" name="address" type="text" placeholder="Ex: 123 ABC St, Faketown" />
						<br />
						<input class ="btn btn-success btn-lg" id="submit" type="submit" name="submit" value="Rate"/>
					</div>
				</form>

				<div id="fail2" class="alert alert-danger center result"></div>
				<div id = "success" class="alert alert-success center result"></div>
				<div id="fail" class="alert alert-danger center result"></div>
			</div>
		</div>
	
	</div>

 <script>

 	$(".contentContainer").css("min-height",$(window).height());

 	$("#submit").click(function(event){

 		event.preventDefault();

 		var search  = encodeURIComponent($('#address').val());
 		
 		var result = 0;

 		$(".alert").hide();

 		$.ajax({
	        url: url,
	        type: 'POST',
	        dataType: "xml",
	        data: data,
	        processData: false,
	        contentType: false,
	        success: function (data, status)
	        {
	        	console.log(data);
	        },
	        error: function (xhr, desc, err)
	        {
	            console.log("error");

	        }
    	});        


 		$.ajax({
			type: "POST",
			url: "https://maps.googleapis.com/maps/api/geocode/xml?address="+search+"&key=AIzaSyBbsikiB0IfAKmAWMfxh9sn0vdSLM741cw",
			dataType: "xml",
			success: processXML,
			error: error
		});
		
 		function error(){
 			$("#fail2").html("Could not connect to server").fadeIn();
 		}

		function processXML(xml){
			var zip = []

			$(xml).find("address_component").each( function(index){

				if($(this).find("type").text() == "postal_code"){

					zip.push($(this).find("long_name").text());

	 				result = 1;

				}
			
			});

			var string = "";
			if(zip.length>0){
				for(i=0; i<zip.length; i++){
					if(zip.length==1){
						string = zip[i] +".";
					}else if(zip.length-1 == i){
						string += "or " + zip[i] +".";
					}else{
						string += zip[i] +", ";
					}
				}
			}
			

			if(zip.length==1){
				$("#success").html("Your post code is "+ string).fadeIn();
			}else{
				$("#success").html("Your post code could be "+ string).fadeIn();
			}

			if (result == 0){

				$("#fail").html("Incorrect information as your input.").fadeIn();

			}
		}	
 	});
 		

 </script>
</body>
</html>