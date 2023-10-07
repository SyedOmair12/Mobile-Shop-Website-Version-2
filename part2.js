/**
*Author: Syed Omair (102863768)
*Target: register.html
*Purpose: This file is for scripting register.html
*Created: 28-04-2020
*last Updated: 28-04-2020
*/
/* write header comments here 

functions in this file
- validateEnquire: validate the form on the enquire page
- validatePayment: validate the form on the payment page
- getInfo: get information from storage
- saveInfo: save information to storage
*/
"use strict";
//*************************  validate enquire form   ***************
function testQuantity(quantity, mobileType){
	var err="";
	if (isNaN(quantity)) {
		err += mobileType + " quantity is not a number. \n";
	}
	else if  (quantity <0)  {
		err +=  mobileType + " quantity cannot be negative. \n";
	}
	else if (parseInt(quantity, 10) !== Number(quantity)) { 
		err +=  mobileType + " quantity is not an integer. \n";
	}
	return err;
}	
function validateEnquire() {
	var errMsg="";
	var result=true;
	var temp="";
	
	var firstname=document.getElementById("firstname").value.trim();
	var lastname=document.getElementById("lastname").value.trim();
	var email=document.getElementById("email").value.trim();
	var streetaddress=document.getElementById("streetaddress").value.trim();
	var suburb=document.getElementById("suburb").value.trim();
	var state=document.getElementById("state").value.trim();
	var postcode=document.getElementById("postcode").value.trim();
	var phonenumber=document.getElementById("phonenumber").value.trim();
	var contact=document.getElementById("contact").value.trim();
	var iphone11promax=document.getElementById("iphone11promax").value.trim();
	var iphonex=document.getElementById("iphonex").value.trim();
	var oneplus=document.getElementById("oneplus").value.trim();
	var samsung=document.getElementById("samsung").value.trim();
	// validate first and last name and other requirements. 
	if (firstname=="") {
		errMsg += "Please enter your first name.\n";
	}
	if (lastname=="") {
		errMsg += "Please enter your last name.\n";
	}
	if (postcode.charAt(0)=="3" && state=="VIC"){
		result = true;
	}
	else if (postcode.charAt(0)=="8" && state=="VIC"){
		result = true;
	}
    else if (postcode.charAt(0)=="1" && state=="NSW"){
		result = true;
	}
	else if (postcode.charAt(0)=="2" && state=="NSW"){
		result = true;
	}
	else if (postcode.charAt(0)=="4" && state=="QLD"){
		result = true;
	}
	else if (postcode.charAt(0)=="9" && state=="QLD"){
		result = true;
	}
	else if (postcode.charAt(0)=="0" && state=="NT"){
		result = true;
	}
	else if (postcode.charAt(0)=="6" && state=="WA"){
		result = true;
	}
	else if (postcode.charAt(0)=="5" && state=="SA"){
		result = true;
	}
	else if (postcode.charAt(0)=="7" && state=="TAS"){
		result = true;
	}
	else if (postcode.charAt(0)=="0" && state=="ACT"){
		result = true;
	}
	else{
		errMsg += "please match the conditions for state and postcode.\n";
		result = false;
	}
	// validate quantity
	if (iphone11promax=="" && iphonex=="" && oneplus=="" && samsung=="" ) {
		errMsg += "You haven't entered quantity for any mobile. \n";
	}
	else {
		if (iphone11promax!="" ){
			temp = testQuantity (iphone11promax, "Iphone11promax");
			if (temp!="") {
				errMsg += temp;
			}
		}
		if (iphonex!="" ){		
			temp = testQuantity (iphonex, "IphoneX");
			if (temp!="") {
				errMsg += temp;
			}
		}
		if (oneplus!="" ){		
			temp = testQuantity (oneplus, "Oneplus");
			if (temp!="") {
				errMsg += temp;
			}
		}
		if (samsung!="" ){		
			temp = testQuantity (samsung, "Samsunggalaxy");
			if (temp!="") {
				errMsg += temp;
			}
		}
		
		if (iphone11promax+iphonex+oneplus+samsung==0) {
			errMsg += "Your total quantity is zero. \n";
		}
	}
	//  more validation here 
	
	if (errMsg!="") { // with errors
		alert (errMsg);
		result=false;
	}
	else {    // no error, save info to storage
		saveInfo(firstname, lastname, email, streetaddress, suburb, state, postcode, phonenumber, contact, iphone11promax, iphonex, oneplus, samsung);
	}
	return result;	
}
//*************************  validate payment form   ***************
function validatePayment() {
	var errMsg="";
	var result=true;
	
	var cardType=document.getElementById("cardType").value;
	var cardName=document.getElementById("cardName").value.trim();
	var cardNumber=document.getElementById("cardNumber").value.trim();
	var cardValue=document.getElementById("cardValue").value.trim();
	var cardExpiry=document.getElementById("cardExpiry").value.trim();
    if(cardType==""){
		errMsg += "Please select type of credit card.\n";
	}
	if (cardName=="") {
		errMsg += "Please enter the name on the credit card.\n";
	}
	if (cardNumber=="") {
		errMsg += "Please enter the credit card number. \n";
	}
	if (cardValue=="") {
		errMsg += "Please enter the credit card value. \n";
	}
	if (!cardValue.match(/^[0-9]{3,4}$/)) {
		errMsg += "Please enter a valid CVV. \n";
	}
	if (cardExpiry=="") {
		errMsg += "Please enter the credit card Expiry. \n";
	}
	if (!cardExpiry.match(/^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/)) {
		errMsg += "Please enter a valid credit card Expiry. \n";
	}
	if (isNaN(cardNumber)){
		errMsg += "Enter a valid card number\n";
	}
	if (cardNumber.length < 14 || cardNumber.length > 17){
		errMsg += "card number must be exactly 15 to 16 digits.\n";
	}
	if (cardName.length > 40 || (!cardName.match(/^[a-zA-Z]+$/)) ) {
		errMsg += "Name on card should be maximum of 40 characters, alphabetical.\n";
	}
	if (cardNumber.length != 16 && cardType=="visa") {
		errMsg += "Visacard length should have 16 digit.\n";
     }
	if (cardType=="visa" && cardNumber.charAt(0) =='3'){
		errMsg += "Visa card start with a 4.\n";
	}
	if (cardNumber.length != 16 && cardType=="master") {
		errMsg += "Mastercard length should be 16.\n";
     }
	else if (!cardNumber.match(/^(?:5[1-5][0-9]{14})$/) && cardType=="master"){
		errMsg += "Mastercard number starts from 51 through 55.\n";
	}
	if (cardNumber.length != 15 && cardType=="amex"){
		errMsg += "American express length should be 15.\n";
	}
	else if (!cardNumber.match(/^(?:3[47][0-9]{13})$/) && cardType=="amex"){
		errMsg += "American Express number starts from 34 or 37.\n";
	}
	if (errMsg!="") {
		alert (errMsg);
		result=false;
	}

	return result;	
}
//*******************  save and get information from storate  ***************
function saveInfo (firstname, lastname, email, streetaddress, suburb, state, postcode, phonenumber, contact, iphone11promax, iphonex, oneplus, samsung){  // save information to storage
	if(typeof(Storage)!=="undefined"){  // the browser support web storage
		localStorage.setItem("firstname", firstname);
		localStorage.setItem("lastname", lastname);
		localStorage.setItem("email", email);
		localStorage.setItem("streetaddress", streetaddress);
		localStorage.setItem("suburb", suburb);
		localStorage.setItem("state", state);
		localStorage.setItem("postcode", postcode);
		localStorage.setItem("phonenumber", phonenumber);
		localStorage.setItem("contact", contact);
		localStorage.setItem("iphone11promax", iphone11promax);
		localStorage.setItem("iphonex", iphonex);
		localStorage.setItem("oneplus", oneplus);
		localStorage.setItem("samsung", samsung);
		
	}
}

function getInfo(){ 
	if (typeof(Storage)!=="undefined"){// the browser support web storage
		if (localStorage.getItem("firstname") !== null){// there are some saved info in storage  
			// name
			document.getElementById("fullname").textContent = localStorage.getItem("firstname") + " " + localStorage.getItem("lastname");
			
			document.getElementById("firstname").value = localStorage.getItem("firstname");	 
			document.getElementById("lastname").value = localStorage.getItem("lastname");
			document.getElementById("email").value = localStorage.getItem("email");
			document.getElementById("streetaddress").value = localStorage.getItem("streetaddress");
			document.getElementById("suburb").value = localStorage.getItem("suburb");
			document.getElementById("state").value = localStorage.getItem("state");
			document.getElementById("postcode").value = localStorage.getItem("postcode");
			document.getElementById("phonenumber").value = localStorage.getItem("phonenumber");
			document.getElementById("contact").value = localStorage.getItem("contact");
			// quantity     apple 0.99 each, banana 0.36 each, choc bar 1, chewing gum 1.85
			var cost=0;
			if (localStorage.getItem("iphone11promax")!=null){
				var iphone11promax=Number(localStorage.getItem("iphone11promax"));
				document.getElementById("iphone11promax").value = iphone11promax;
				cost=cost+2340.00*iphone11promax;
			}
			if (localStorage.getItem("iphonex")!=null){				
				var iphonex=Number(localStorage.getItem("iphonex"));
				document.getElementById("iphonex").value = iphonex;
				cost=cost+599.99*iphonex;
			}
			if (localStorage.getItem("oneplus")!=null){				
				var oneplus=Number(localStorage.getItem("oneplus"));
				document.getElementById("oneplus").value = oneplus;
				cost=cost+888.00*oneplus;
			}
			if (localStorage.getItem("samsung")!=null){				
				var samsung=Number(localStorage.getItem("samsung"));
				document.getElementById("samsung").value = samsung;
				cost=cost+2100.00*samsung;
			}
			
			document.getElementById("totalcost").value = cost.toFixed(2);
		}

	}
}
function clearStorage(){  // for cancel order button
	localStorage.clear();
	location.href="index.html";
}

//*************************  init ***************
// if you want to use one javascript for two pages, you can use if else to seperate the init
function init() {
	if (document.getElementById("enquireForm")!=null) {  // it is enquire page  
		document.getElementById("enquireForm").onsubmit = validateEnquire;
	}
	else if (document.getElementById("paymentForm")!=null) { // it is payment page  
		getInfo();     // fill up the page with information passed from enquire page
		document.getElementById("paymentForm").onsubmit = validatePayment;
		document.getElementById("cancelOrder").onclick = clearStorage;
		
	}
}
// if you link to 2 javascript files in the same html and they both have init, you can use addEventListener and give the two init function different names
window.addEventListener("load",init);
//window.onload = init;  
