"use strict";

let firebase = require("./fb-config");
let user = require("./user.js");
//add to watchlist is clicked - add this data to user FB
let addMovies = (movieObj) => {
    console.log("movieObj", movieObj);
    return new Promise(function(resolve, reject) {
        $.ajax({
            url: `${firebase.getFBsettings().databaseURL}/movies.json`,
            type: 'POST',
            data: JSON.stringify(movieObj),
            dataType: 'json'
        }).done(function(movieID) {
            resolve(movieID);
        });
    });
};

let getUnwatchedMovies = () => {
    return new Promise((resolve, reject)=>{
        $.ajax({
            url: `${firebase.getFBsettings().databaseURL}/movies.json?orderBy="user"&equalTo="${user.getUser()}"`,
            type: 'GET'

        }).done(function(data){
            console.log(data);
            resolve(data);
        });
    });
};


let getWatchedMovies = () => {
    return new Promise((resolve, reject)=>{
        $.ajax({
            url: `${firebase.getFBsettings().databaseURL}/movies.json?orderBy=user&equalTo=${user.getUser()}`,
            type: 'GET'
        }).done(function(data){
            console.log(data);
            resolve(data);
        });
    });
};

let removeFromFB = (id) => {
    return new Promise((resolve, reject)=>{
        $.ajax({
            url: `${firebase.getFBsettings().databaseURL}/movies/${id}.json`,
            type: 'DELETE'
        }).done(function(){
            resolve();
        });
    });
};

let watchClick = () => {
    //watch clicked - true or false on FB
    //if true - append stars
    //POST:
};

let starsClick = () => {
    //starts clicked - rating sent to FB
    //ammount of stars clicked needs to appear on the DOM
    //PATCH:
};

let addToList = () =>{

};

module.exports= {addMovies, getUnwatchedMovies, getWatchedMovies, removeFromFB, watchClick, starsClick};


