import * as firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyA50wklLQomXTwt9jTXBQhzQoJBmtWSyoU',
  authDomain: 'sjakk-3bc2d.firebaseapp.com',
  databaseURL: 'https://sjakk-3bc2d.firebaseio.com',
  projectId: 'sjakk-3bc2d',
  storageBucket: '',
  messagingSenderId: '84685046486',
};

const app = firebase.initializeApp(config);

module.exports = app;
