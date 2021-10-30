const admin = require("firebase-admin");
admin.initializeApp();

const generateLink = require('./generateLink');
const joinRoom = require('./joinRoom');

exports.generateLink = generateLink.generateLink;
exports.joinRoom = joinRoom.joinRoom;