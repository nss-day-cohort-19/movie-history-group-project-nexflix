"use strict";

let Handlebars = require('hbsfy/runtime'),
	mdb = require('./mdb-loader.js'),
	moviesTemplate = require('../templates/populatemovies.hbs');
let user = require("./user");

let comboObj = {
	movies: []
};

let loadMoviesToDom = () => {
	mdb.getPopular().
	then(function(songData){
		console.log("popular", songData);
		songData.forEach(function(element){
			var newObj = {};
			console.log("element", element);
			newObj.movie = element.title;
			newObj.year = element.year;
			newObj.id = element.id;
			mdb.getCredits(element.id)
			.then(function(actors){
				console.log("actors", actors);
				newObj.cast = actors;
				comboObj.movies.push(newObj);
				// console.log("comboObj", comboObj);
				$("#outputArea").html(moviesTemplate(comboObj));
			});
		});
	});

};
let fivefifty = "550";
let getCreditData = (movieId) => {
	mdb.getCredits(movieId)
	.then(function(creditData){
		console.log("creditData", creditData);
	});
};
loadMoviesToDom();
// getCreditData(fivefifty);
// mdb.creditsURL(fivefifty);



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

//user clicks unwatched search filter and breadcrumbs appear
$("#untracked").click(function() {
    $("#breadcrumb").html(`<li class="search-results">Search Results</li>`);
});

//user clicks unwatched search filter and breadcrumbs appear
$("#unwatched").click(function() {
    $("#breadcrumb").html(`<li class="search-results">Search Results</li>`);
    $("#breadcrumb").append(`<li class="search-results">Unwatched</li>`);
});

//user clicks watched search filter and breadcrumbs appear
$("#watched").click(function() {
    $("#breadcrumb").html(`<li class="search-results">Search Results</li>`);
    $("#breadcrumb").append(`<li class="search-results">Unwatched</li>`);
    $("#breadcrumb").append(`<li class="search-results">Watched</li>`);
});

//user clicks favorites search filter and breadcrumbs appear
$("#favorites").click(function() {
    $("#breadcrumb").html(`<li class="search-results">Search Results</li>`);
    $("#breadcrumb").append(`<li class="search-results">Unwatched</li>`);
    $("#breadcrumb").append(`<li class="search-results">Watched</li>`);
    $("#breadcrumb").append(`<li class="search-results">Favorites</li>`);

// Get input value and pass it to .. searchMBD
$(document).on('click', '.find-new-movie', () => {
	let inputValue = $('.form-control').val();
	let movieName = inputValue.replace(/ /gi, '+');
	mdb.searchMDB(movieName)
	.then((value) => {
    	console.log('Input value is', movieName);
	});
});
