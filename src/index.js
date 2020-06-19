import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./component/App";
import * as serviceWorker from "./serviceWorker";
import * as firebase from "firebase";

const configOption = {
  apiKey: "AIzaSyAObIBh0G5H1FziHC0M6Pvwo3zqR3g5Qd4",
  authDomain: "season-plan2.firebaseapp.com",
  databaseURL: "https://season-plan2.firebaseio.com",
  projectId: "season-plan2",
  storageBucket: "season-plan2.appspot.com",
  messagingSenderId: "476457317817",
  appId: "1:476457317817:web:e7c74fac8d5ae14a893268",
};

firebase.initializeApp(configOption);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.unregister();
