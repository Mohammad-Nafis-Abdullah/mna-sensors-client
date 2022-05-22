import { getAuth } from 'firebase/auth';

// paste the config file here from the firebase project in console of firebase
//......

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBMi1V-rTPIGh6nsmXbF5oFh1pjrmXmVXg",
    authDomain: "mna-sensors.firebaseapp.com",
    projectId: "mna-sensors",
    storageBucket: "mna-sensors.appspot.com",
    messagingSenderId: "783423432684",
    appId: "1:783423432684:web:6606fe12b40ee1da7ac2c9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//.....
// eslint-disable-next-line no-undef
const auth = getAuth(app);
export default auth;