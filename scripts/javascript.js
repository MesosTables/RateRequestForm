console.log("JavaScript Loaded");

var urlPassed = "";
var user = "";
var pass = "";
var contractTypeList = "";
var month = "";
var day = "";
var year = "";
var hour = "";
var minute = "";
var oZip = "";
var oCountry = "";
var dZip = "";
var dCountry = "";
var hazmat = false;
var piece = "";
var weight = "";
var freightClass = "";


var setValues = function(){
	contractTypeList = "";
	urlPassed = $("#url1").val();
	user = $("#user").val();
	pass = $("#pass").val();
	$('input[name=contractType]').each(function(){
		contractTypeList = this.checked ? contractTypeList.concat($(this).val(), " ") : contractTypeList.concat("");
	});
	
	month = $("select[name=month]").val();
	day = $("select[name=day]").val();
	year = $("select[name=year]").val();
	hour = $("select[name=hour]").val();
	minute = $("select[name=minute]").val();
	
	oZip = $("#origZip").val();
	oCountry = $("#origCountry").val();
	dZip = $("#destZip").val();
	dCountry = $("#destCountry").val();
	
	hazmat = $("#isHazmat").checked ? true : false;
	
	piece = $("#pieceCount").val();
	weight = $("#netWeight").val();
	freightClass = $("#class").val();
};

function displayRates(rates){
	//$("#success").html(rates).fadeIn();
	console.log("Displayed");
	var output ="";
	counter = 1;
	//for each Rate
	$(rates).find("Rate").each( function(){

		if($(this).find("ContractInfo > Id").text() != ""){

			output += "Rate "+ counter +":<br />"

			if($(this).find("ContractInfo > Id").text() != ""){
				output +=  "Contract ID "+$(this).find("ContractInfo > Id").text() +" - " +$(this).find("ContractInfo > Description").text()+"<br />";
			}
			
			if($(this).find("CarrierTradingPartner > Name").text() != ""){
				output +=  "Carrier: "+$(this).find("CarrierTradingPartner > Name").text() +"<br />";
			}

			output += "<hr />"
			counter++;
		}

	});
	//display created string to #success
	if(output!= ""){
		$("#success").html(output).fadeIn();
	}
}

function createCORSRequest(url, method, data, callback, errback) {
    var xhr;
    


    if(XMLHttpRequest) {
        xhr = new XMLHttpRequest();
 
        if('withCredentials' in xhr) {
            xhr.open(method, url, true);
			xhr.setRequestHeader("Content-type", "application/xml");
            xhr.onerror = errback;
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    if (xhr.status >= 200 && xhr.status < 400) {
                    	displayRates(xhr.responseText);
                    } else {
                        console.log(new Error('Response returned with non-OK status'));
                    }
                }
            };
            xhr.send(data);
        }
    } else if(XDomainrequest) {
        xhr = new XDomainrequest();
        xhr.open(method, url);
		xhr.onerror = errback;
        xhr.onload = function() {
             console.log(xhr.responseText);
        };
        xhr.send(data);
    } else {
        console.log(new Error('CORS not supported'));
    }
}

var callAPI = function(){
	var url = 'http://'+urlPassed+'/web/services/rating/findRates?username='+user+'&password='+pass;
	var method = 'POST';
	var data = "<?xml version='1.0' encoding='UTF-8'?>\
	<tns:RatingRequest xmlns:tns='http://schemas.3gtms.com/tms/v1/services/rating' xmlns:tns1='http://schemas.3gtms.com/tms/v1/services/rating' xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' xsi:schemaLocation='http://schemas.3gtms.com/tms/v1/services/rating 3GTMSRatingRequest.xsd '>\
	  <RequestToken>Sample 1.0</RequestToken>\
	  <Configuration> \
		<ContractUse>"+contractTypeList+"</ContractUse>\
	 <ContractStatus>InProduction</ContractStatus>\
		<SkipCarrierSafetyChecks>true</SkipCarrierSafetyChecks><EnableRoutingGuides>false</EnableRoutingGuides>\
	 <Parcel>\
	 </Parcel>\
	  </Configuration>\
	  <PickupDate>"+year+"-"+month+"-"+day+"T"+hour+":"+minute+":01-04:00</PickupDate> \
	  <Stops>    \
		<Stop>\
		  <Index>1</Index><Location><City></City>\
			<State><Code></Code></State>\
			<PostalCode>"+oZip+"</PostalCode>\
	<Country><FipsCode>"+oCountry+"</FipsCode></Country><RoutingGuideGroup/>\
		  </Location>\
		</Stop>    \
		<Stop>\
		  <Index>2</Index> <Location><City></City>\
			<State><Code></Code></State>\
			<PostalCode>"+dZip+"</PostalCode>\
			<Country><FipsCode>"+dCountry+"</FipsCode></Country><RoutingGuideGroup/>\
		  </Location>\
		</Stop>\
	  </Stops>\
	  <Freight>\
		<Hazmat>"+hazmat+"</Hazmat>    \
	   <TotalPallets>1</TotalPallets>\
		<PalletPositions>\
		  <PalletPosition>\
			<PositionCount>1</PositionCount>\
			<AdjustedPositionCount>1</AdjustedPositionCount>\
			<PositionWeight UOM='Lb'>1000</PositionWeight>\
		  </PalletPosition>\
		</PalletPositions>\
		<TotalArea UOM='SqFt'>1</TotalArea>\
		<TotalTrailerLengthUsage UOM='Ft'>0</TotalTrailerLengthUsage>\
		<LineItems>\
				<LineItem>\
			<PieceCount>"+piece+"</PieceCount>\
			<NetWeight UOM='Lb'>"+weight+"</NetWeight>\
			<GrossWeight UOM='Lb'>"+weight+"</GrossWeight>\
			<FreightClassification>"+freightClass+"</FreightClassification>\
			</LineItem>\
		</LineItems>\
	  </Freight>\
	  <Accessorials>\
	 </Accessorials>\
	</tns:RatingRequest>";
	var log = function (x) {console.log(x)};
	var xhr = createCORSRequest(url, method, data, log(), log());

}


$(document).ready(function(){
	$("#rateForm").submit(function (e){
		 e.preventDefault();
	});
});

$(document).ready(function(){

	$("#buttSubmit").click(function(){
		$(".alert").hide();
		setValues();
		callAPI();
		//console.log(urlPassed + user + pass + contractTypeList + month + day + year + hour + minute + oZip + oCountry + dZip + dCountry + hazmat + piece + weight + freightClass);
	});
});
