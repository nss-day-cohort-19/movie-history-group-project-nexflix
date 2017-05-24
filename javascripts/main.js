"use strict";

let mdb = require('./mdb-loader');
let user = require("./user");


//user login
$("#register-login").click(function() {
  console.log("clicked on register-login");
  user.logInGoogle()
  .then(function(result) {
    console.log("result from Login", result.user.uid);
    user.setUser(result.user.uid);
    // loadMoviesToDom();
    $("#splashNav").addClass("hide");
    $("#loggedInNav").removeClass("hide");
    $("#watchedButtons").removeClass("hide");
  });
});

//user logout
$("#logout").click(function() {
    console.log("logout clicked");
    user.logOut();
    $("#splashNav").removeClass("hide");
    $("#loggedInNav").addClass("hide");
    $("#watchedButtons").addClass("hide");
});


// Get input value and pass it to .. searchMBD
$(document).on('click', '.find-new-movie', () => {
	let inputValue = $('.form-control').val();
	let movieName = inputValue.replace(/ /gi, '+');
	mdb.searchMDB(movieName)
	.then((value) => {
    	console.log('Input value is', movieName);
	});
});


