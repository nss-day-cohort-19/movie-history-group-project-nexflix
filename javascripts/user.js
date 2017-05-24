"use strict";

let firebase = require("./fb-config"),
    provider = new firebase.auth.GoogleAuthProvider(),
    currentUser = null;

firebase.auth().onAuthStateChanged(function(user) {
    console.log("onAuthStateChanged", user);
    if (user) {
        currentUser = user.uid;
    } else {
        currentUser = null;
        console.log("NO USER LOGGED IN");
    }
});

function logInGoogle() {
    return firebase.auth().signInWithPopup(provider);
}

function logOut() {
    return firebase.auth().signOut();
}

function setUser(value) {
    currentUser = value;
}

function getUser() {
    return currentUser;
}

module.exports = {logInGoogle, logOut, setUser, getUser};
