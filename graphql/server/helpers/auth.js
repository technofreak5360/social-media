
var admin = require("firebase-admin");

var serviceAccount = require('../config/fbServiceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    //   databaseURL: "https://social-media60.firebaseio.com"
});

exports.authCheck = async (req) => {
    try {
        const currentUser = await admin.auth().verifyIdToken(req.headers.authtoken);
        console.log('CURRENT USER', currentUser);
        return currentUser;
    } catch (error) {
        console.log('AUTH CHECK ERROR', error);
        throw new Error('Invalid or expired token');
    }
};