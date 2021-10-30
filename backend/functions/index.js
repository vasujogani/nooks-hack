const functions = require("firebase-functions");

OPENTOK_APP_ID = "46908704"
OPENTOK_APP_SECRET = "32ffe9a1f88466836e7fa790cdd4f89ab73bbef9"

const OpenTok = require("opentok");
const opentok = new OpenTok(OPENTOK_APP_ID, OPENTOK_APP_SECRET);

exports.generateLink = functions.https.onRequest((request, response) => {
    let token;

    opentok.createSession(function (err, session) {
        if (err) return console.log(err);
        token = session.generateToken();
        
        response.send({
            sessionId: token
        });
      });

    functions.logger.info("Hello logs!", {structuredData: true});
});