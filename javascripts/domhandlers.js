"use strict";

let fb = require("./fb-loader"),
    user = require("./user");

function cardDelete() {
    //user clicks the x and card is deleted
    //movie is removed from users Firebase - call removeFromFB function
    fb.removeFromFB();
}

//user clicks "x" - run removeFromFB
$(document).on('click', '.glyphicon', () => {
    console.log("glyphicon has been clicked");
    // fb.removeFromFB();
});

//user clicks on the stars - run starsClick
$(".stars").click(function() {
    fb.starsClick();
});

//user clicks show unwatched movies
// $(".unwatched").click(function() {
//     fb.getUnwatchedMovies()

// });

//user clicks show watched movies
$(".watched").click(function() {
    fb.getUnwatchedMovies();
});

// //user clicks show favorite movies
// $(".favorite").click(function() {
//     fb.getUnwatchedMovies();
// });


$(document).on("click", ".addToWatchlist", function(event){
    console.log('event', event);
    var watchlistText = event.target.parentElement;
    console.log("watchlistText", watchlistText);
    var watchlistButton = watchlistText.closest(".panel");
    var title = watchlistButton.querySelector("h3").innerText;
    console.log("title", title);
    var actors = watchlistButton.querySelector("p").innerText;
    console.log("actors", actors);
    var date = watchlistButton.querySelector(".btn").innerText;
    console.log("date", date);
    var poster = watchlistButton.querySelector(".poster").src;
    console.log('poster', poster);
    var userName = user.getUser();
    var addToWatchlistObj = {
        movie: title,
        cast: actors,
        year: date,
        poster: poster,
        stars: null,
        boolean: false,
        fb: "fb",
        user: userName
    };
    console.log(addToWatchlistObj);

    fb.addMovies(addToWatchlistObj);



    // SOMEWHERE IN HERE IS WHERE FB.ADDMOVIES GETS CALLED

});
