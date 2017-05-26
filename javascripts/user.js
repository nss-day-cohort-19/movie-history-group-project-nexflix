"use strict";

let firebase = require("./fb-config"),
    provider = new firebase.auth.GoogleAuthProvider(),
    currentUser = null;

firebase.auth().onAuthStateChanged(function(user) {
    console.log("onAuthStateChanged", user);
    if (user) {
        currentUser = user.uid;

        $("#splashNav").addClass("hide");
        $("#noUser").addClass("hide");
        $("#loggedInNav").removeClass("hide");
        $("#watchedButtons").removeClass("hide");
    } else {
        currentUser = null;
        console.log("NO USER LOGGED IN");
        //alert('Please Register/Login');
        $("#splashNav").removeClass("hide");
        $("#noUser").removeClass("hide");
        $("#loggedInNav").addClass("hide");
        $("#watchedButtons").addClass("hide");
    }
});

function logInGoogle() {
    console.log("logging in");
    return firebase.auth().signInWithPopup(provider);
}

function logOut() {
    console.log("logging out");
    return firebase.auth().signOut();
}

function setUser(value) {
    currentUser = value;
}

function getUser() {
    return currentUser;
}

module.exports = {logInGoogle, logOut, setUser, getUser};
