import firebase from 'firebase';
var config = {
    apiKey: "AIzaSyClbavooKpMmJHVmg59uTbbhnghdf4ORfU",
    authDomain: "fir-and-react-e84eb.firebaseapp.com",
    databaseURL: "https://fir-and-react-e84eb.firebaseio.com",
    projectId: "fir-and-react-e84eb",
    storageBucket: "fir-and-react-e84eb.appspot.com",
    messagingSenderId: "286717727233"
};
var fire = firebase.initializeApp(config);

export default fire;