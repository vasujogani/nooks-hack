const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { OPENTOK_APP_ID, OPENTOK_APP_SECRET } = require('./utils/constants');

const OpenTok = require("opentok");
const opentok = new OpenTok(OPENTOK_APP_ID, OPENTOK_APP_SECRET);

exports.joinRoom = functions.https.onRequest((request, response) => {
    if (request.body.link_id == null || request.body.link_id === '' || typeof request.body.link_id === 'undefined') {
        return response.status(400).send('Missing link_id');
    }

    const linkRef = admin.firestore().collection('links').doc(request.body.link_id);
    
    linkRef.get().then((snapshot) => {
        if (!snapshot.exists) {
            console.log(request.body.link_id + ' does not exist');
            return response.status(400).send('Invalid link_id');
        }

        console.log(request.body.link_id + ' found');

        if (snapshot.data().session_id == null || snapshot.data().session_id === '' || typeof snapshot.data().session_id === 'undefined') {
            console.log('No session id found for link provided');
            return response.status(500).send('Missing session_id');
        }
        
        console.log('Session id found: ' + snapshot.data().session_id);

        let sessionId = snapshot.data().session_id;

        getSessionToken(sessionId).then(token => {
            return response.json({
                session_token: token,
                session_id: sessionId
            });
        });

    });
    
    functions.logger.info("Hello logs!", {structuredData: true});
});

const getSessionToken = (sessionId) => {
    return new Promise((resolve, reject) => {
      resolve(opentok.generateToken(sessionId));
    });
}