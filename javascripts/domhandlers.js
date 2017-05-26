"use strict";

let fb = require("./fb-loader"),
    user = require("./user");

function cardDelete(id) {
    //user clicks the x and card is deleted
    $('#'+id).remove();
    let fbID = id;
    //movie is removed from users Firebase - call removeFromFB function
    fb.removeFromFB(fbID);
}

//user clicks "x" - run removeFromFB
$(document).on('click', '.glyphicon', (event) => {
    //Spits back id of the div containing the glyphicon
    console.log("glyphicon has been clicked", event.target.offsetParent.offsetParent.id);
    cardDelete(event.target.offsetParent.offsetParent.id);
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
    var id = event.currentTarget.offsetParent.id;
    var addToWatchlistObj = {
        movie: title,
        cast: actors,
        year: date,
        poster: poster,
        stars: null,
        watched: false,
        fb: "fb",
        id: id,
        user: userName
    };
    console.log(addToWatchlistObj);

    fb.addMovies(addToWatchlistObj);

// Remove element from DOM
    $('#'+id).remove();

});
