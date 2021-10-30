const { initializeApp } = require("firebase-admin");

initializeApp();

const generateLink = require('./generateLink');

exports.generateLink = generateLink.generateLink;