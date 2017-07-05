const firebase = require('./FirebaseInit');

const provider = new firebase.auth.FacebookAuthProvider();
module.exports = provider;
