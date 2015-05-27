console.log("JavaScript Loaded");

var url = "";
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
	url = $("#url").val();
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

function createCORSRequest(url, method, data, callback, errback) {
    var xhr;
    
    if(XMLHttpRequest) {
        xhr = new XMLHttpRequest();
 
        if('withCredentials' in xhr) {
            xhr.open(method, url, true);
            errback(xhr.onerror);
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    if (xhr.status >= 200 && xhr.status < 400) {
                        callback(xhr.responseText);
                    } else {
                        errback(new Error('Response returned with non-OK status'));
                    }
                }
            };
            xhr.send(data);
        }
    } else if(XDomainrequest) {
        xhr = new XDomainrequest();
        xhr.open(method, url);
        errback(xhr.onerror);
        xhr.onload = function() {
            callback(xhr.responseText);
        };
        xhr.send(data);
    } else {
        errback(new Error('CORS not supported'));
    }
}

var callAPI = function(){
	var url = 'http://online-sb.3gtms.com/web/services/rating/findRates?username=sanity&password=trans1te';
	var method = 'POST';
	var data = "<?xml version='1.0' encoding='UTF-8'?>\
	<tns:RatingRequest xmlns:tns='http://schemas.3gtms.com/tms/v1/services/rating' xmlns:tns1='http://schemas.3gtms.com/tms/v1/services/rating' xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' xsi:schemaLocation='http://schemas.3gtms.com/tms/v1/services/rating 3GTMSRatingRequest.xsd '>\
	  <RequestToken>Sample 1.0</RequestToken>\
	  <Configuration> \
		<ContractUse>BlanketCost BlanketBilling </ContractUse>\
	 <ContractStatus>InProduction</ContractStatus>\
		<SkipCarrierSafetyChecks>true</SkipCarrierSafetyChecks><EnableRoutingGuides>false</EnableRoutingGuides>\
	 <Parcel>\
	 </Parcel>\
	  </Configuration>\
	  <PickupDate>2015-03-15T13:30:01-04:00</PickupDate> \
	  <Stops>    \
		<Stop>\
		  <Index>1</Index> <Location><City>Chattanooga</City>\
			<State><Code>TN</Code></State>\
	<PostalCode/>\
	<Country><FipsCode>US</FipsCode></Country><RoutingGuideGroup/>\
		  </Location>\
		</Stop>    \
		<Stop>\
		  <Index>2</Index> <Location><City></City>\
			<State><Code></Code></State>\
			<PostalCode> 27612</PostalCode>\
			<Country><FipsCode>US</FipsCode></Country><RoutingGuideGroup/>\
		  </Location>\
		</Stop>\
	  </Stops>\
	  <Freight>\
		<Hazmat>false</Hazmat>    \
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
			<PieceCount>1</PieceCount>\
			<NetWeight UOM='Lb'>1000</NetWeight>\
			<GrossWeight UOM='Lb'>1000</GrossWeight>\
			<FreightClassification>55</FreightClassification>\
			</LineItem>\
		</LineItems>\
	  </Freight>\
	  <Accessorials>\
	 </Accessorials>\
	</tns:RatingRequest>";
	var log = function (x) {console.log(x)};
	var xhr = createCORSRequest(url, method, data, log(),log());
}


$(document).ready(function(){
	$("#rateForm").submit(function (e){
		 e.preventDefault();
	});
});

$(document).ready(function(){
	$("#buttSubmit").click(function(){
		setValues();
		callAPI();
		console.log(url + user + pass + contractTypeList + month + day + year + hour + minute + oZip + oCountry + dZip + dCountry + hazmat + piece + weight + freightClass);
	});
});
