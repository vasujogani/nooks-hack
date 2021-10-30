const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { db, OPENTOK_APP_ID, OPENTOK_APP_SECRET } = require('./utils/constants');

const OpenTok = require("opentok");
const opentok = new OpenTok(OPENTOK_APP_ID, OPENTOK_APP_SECRET);

var helpers = require('./utils/helpers');
var randomWords = require('random-words');

exports.generateLink = functions.https.onRequest((request, response) => {
    getSessionToken().then(token => {
        const data = {
            created_at: admin.firestore.Timestamp.now()._seconds,
            link_id: request.body.alphanumeric_link ? helpers.randomString(64) : randomWords({ exactly: 4, join: '-' }),
            session_id: token
        };
        admin.firestore().collection('links').doc(data.link_id).set(data).then(writeResult => {
            console.log(writeResult);
            return response.json(data);
        });
    });

    functions.logger.info("Hello logs!", {structuredData: true});
});

const getSessionToken = () => {
    return new Promise((resolve, reject) => {
      opentok.createSession(function (err, session) {
          if (err) return console.log(err);
          token = session.generateToken();
          resolve(token);
      });
    });
}