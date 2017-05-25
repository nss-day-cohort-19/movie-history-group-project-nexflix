"use strict";

let movieDB= require("./mdb-config"),
    moviesArray = [];

function getPopular(){
    return new Promise(function(resolve,reject){
        $.ajax({
            url: `${movieDB.getMDBsettings().popularURL}`
        }).done(function(movieData){
            movieData.results.forEach(function(element){
                let movieObj = {
                    title: `${element.title}`,
                    year: `${element.release_date}`,
                    id: `${element.id}`,
                    poster_path: `${element.poster_path}`
                };
                moviesArray.push(movieObj);
            });
            resolve(moviesArray);

        });
    });
}

function searchMDB(movieName) {
    return new Promise(function(resolve, reject) {
        $.ajax({
            url: `${movieDB.getMDBsettings().searchURL}${movieName}`
        }).done(function(movie) {
            let searchMDBArray = [];
            movie.results.forEach(function(element){
                let searchMdbObj = {
                    title: `${element.title}`,
                    year: `${element.release_date}`,
                    id: `${element.id}`
                };
                searchMDBArray.push(searchMdbObj);
            });
            resolve(searchMDBArray);
        });
    });
}
function getPoster(poster){
    return new Promise(function(resolve,reject){
        $.ajax({
            url: `${movieDB.getMDBsettings().posterURL}${poster}`

        }).done(function(img){
            console.log("poster", `${movieDB.getMDBsettings().posterURL}${poster}` );
            resolve(img);
        }).fail(function(error){
            console.log(error);
        });
    });
}


function getCredits (movieId){
    return new Promise(function(resolve, reject){
        $.ajax({
            url: `${movieDB.getMDBsettings().creditURL}${movieId}${movieDB.getMDBsettings().endCreditURL}`
        }).done(function(credits){
            let actorsArray = [];
            var i;
            for (i = 0; i < 4; i++){
                actorsArray.push(credits.cast[i].name);
            }
            resolve(actorsArray);
        });
    });
}

module.exports= {getPopular, searchMDB, getCredits, getPoster};


