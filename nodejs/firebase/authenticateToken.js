// const firebase = require("firebase-admin");

// const credentials = require("./posts-project-84627-firebase-adminsdk-6hek4-dcfc61bc6e.json");

// firebase.initializeApp({
//     credential: firebase.credential.cert(credentials),
//     databaseURL: "https://posts-project-84627.firebaseapp.com",
// });

async function decodeIDToken(req, res, next) {
    console.log("jhfjhf");
    const token = req.params.token;
    console.log(token);
    try {
        const decodedToken = await firebase.auth().verifyIdToken(token);
        console.log(decodedToken);
        console.log('hgx jsgxcjkh fkd a');
        next();
    } catch (err) {
        res.send({ message: "Could not authorize" })
    }
}
module.exports = decodeIDToken;

