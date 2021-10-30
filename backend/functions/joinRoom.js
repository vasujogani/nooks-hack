const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { OPENTOK_APP_ID, OPENTOK_APP_SECRET } = require('./utils/constants');

const OpenTok = require("opentok");
const opentok = new OpenTok(OPENTOK_APP_ID, OPENTOK_APP_SECRET);

// var helpers = require('./utils/helpers');

exports.generateLink = functions.https.onRequest((request, response) => {

    
    // functions.logger.info("Hello logs!", {structuredData: true});
});