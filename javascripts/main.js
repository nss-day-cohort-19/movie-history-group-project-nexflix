"use strict";

let Handlebars = require('hbsfy/runtime'),
	mdb = require('./mdb-loader.js'),
	moviesTemplate = require('../templates/populatemovies.hbs');
let user = require("./user");
let movieDB= require("./mdb-config");
let comboObj = {
	movies: []
};

// Star Rating Plugin Settings
$(".rating").rating({stars:10, min:1, max:10, step:1, size:'xs',
    starCaptions:{
    1: '1',
    2: '2',
    3: '3',
    4: '4',
    5: '5',
    6: '6',
    7: '7',
    8: '8',
    9: '9',
    10: '10'
}});
console.log("Main.JS has loaded2");






//Popup for immediate user login on page load
user.logInGoogle()
  	.then(function(result) {
    	console.log("result from Login", result.user.uid);
    	user.setUser(result.user.uid);
    });

// Handlebars helper that works with bootstrap grid system to form rows between every 3 items.
Handlebars.registerHelper('grouped_each', function(every, context, options) {
    var out = "", subcontext = [], i;
    if (context && context.length > 0) {
        for (i = 0; i < context.length; i++) {
            if (i > 0 && i % every === 0) {
                out += options.fn(subcontext);
                subcontext = [];
            }
            subcontext.push(context[i]);
        }
        out += options.fn(subcontext);
    }
    return out;
});
// Popular movies loaders.

// WE DON'T NEED THIS RIGHT NOW
let loadPopularMovies = () => {
	// mdb.getPopular().
	// then(function(songData){
	// 	console.log("popular", songData);
	// 	songData.forEach(function(element){
	// 		var newObj = buildNewObj(element);
	// 		mdb.getCredits(element.id)
	// 		.then(function(actors){
	// 			// console.log("actors", actors);
	// 			newObj.cast = actors;
	// 			comboObj.movies.push(newObj);
	// 			// console.log("comboObj", comboObj);
	// 			$("#outputArea").html(moviesTemplate(comboObj));

	// 		});
	// 	});
	// });
};
loadPopularMovies();

//Gets credits to display the actors.
let getCreditData = (movieId) => {
	mdb.getCredits(movieId)
	.then(function(creditData){
		console.log("creditData", creditData);
	});
};

//user login
$("#register-login").click(function() {
  console.log("clicked on register-login");
  user.logInGoogle()
  .then(function(result) {
    console.log("result from Login", result.user.uid);
    user.setUser(result.user.uid);
    // loadMoviesToDom();
    // $("#splashNav").addClass("hide");
    // $("#loggedInNav").removeClass("hide");
    // $("#watchedButtons").removeClass("hide");
  });
});

//user logout
$("#logout").click(function() {
    console.log("logout clicked");
    user.logOut();
    $("#splashNav").removeClass("hide");
    $("#noUser").removeClass("hide");
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
    $("#breadcrumb").append(`<li class="search-results">Watched</li>`);
});

// //user clicks favorites search filter and breadcrumbs appear
// $("#favorites").click(function() {
//     $("#breadcrumb").html(`<li class="search-results">Search Results</li>`);
//     $("#breadcrumb").append(`<li class="search-results">Favorites</li>`);
// });

// Get input value and pass it to .. searchMBD
$(document).on('click', '#untracked', () => {
	let inputValue = $('#search').val();
	let movieName = inputValue.replace(/ /gi, '+');
	$("#outputArea").html(null);
	comboObj = {
		movies: []
	};
	mdb.searchMDB(movieName)
	.then((value) => {
    	console.log('Input value is', value);
    	value.forEach(function(element){
			var newObj = buildNewObj(element);
			mdb.getCredits(element.id)
			.then(function(actors){
				// console.log("actors", actors);
				newObj.cast = actors;
				comboObj.movies.push(newObj);
				// console.log("comboObj", comboObj);
				$("#outputArea").html(moviesTemplate(comboObj));
			});
			console.log("comboObj", comboObj);
		});
	});
});

// Press ENTER in Search Bar to search Untracked Movies
$(".form-control").keypress(function(key){
	if(key.which == 13){
		let inputValue = $('#search').val();
		let movieName = inputValue.replace(/ /gi, '+');
		$("#outputArea").html(null);
		comboObj = {
			movies: []
		};
	    	console.log('Input value is', inputValue);
		mdb.searchMDB(movieName)
		.then((value) => {
	    	value.forEach(function(element){
	    		console.log("WHY THEY USE VALUE", value);
				var newObj = buildNewObj(element);
				mdb.getCredits(element.id)
				.then(function(actors){
					// console.log("actors", actors);
					newObj.cast = actors;
					comboObj.movies.push(newObj);
					// console.log("comboObj", comboObj);
					$("#outputArea").html(moviesTemplate(comboObj));
				});
				console.log("comboObj", comboObj);
			});
		});
	}
});

//Build New Object
let buildNewObj = (element) => {
	let newObj = {
		movie: `${element.title}`,
		year: `${element.year}`,
		id: `${element.id}`,
		mdb: `${element.mdb}`
	};
	if(element.poster_path){
		newObj.poster = `${movieDB.getMDBsettings().posterURL}${element.poster_path}`;
	}
	return newObj;
};
