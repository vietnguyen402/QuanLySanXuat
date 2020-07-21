import React, { useEffect, useState } from "react";
import "./App.css";
import SignIn from "./signin";
import SignUp from "./signup";
import Home from "./home";
import EditAny from "./editany";
import PwdForget from "./pwd-forget";
import * as ROUTES from "../constants/routes";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import * as firebase from "firebase";
import PrivateRoute from "./PrivateRoute";

function App() {
  const [checkedSignIn, setCheckedSignIn] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(function (user) {
      setIsSignedIn(!!user);

      setCheckedSignIn(true);
    });
    return () => unsubscribe();
  }, []);
  if (!checkedSignIn) {
    return null;
  }
  return (
    <Router>
      <Switch>
        <React.Fragment key="App">
          <Route path={ROUTES.SIGN_IN} component={SignIn} />

          <Route path={ROUTES.EDITANY} component={EditAny} />
          <Route path={ROUTES.SIGN_UP} component={SignUp} />
          <Route path={ROUTES.PASSWORD_FORGET} component={PwdForget} />

          <PrivateRoute
            isSignedIn={isSignedIn}
            exact={true}
            path={ROUTES.HOME}
            component={Home}
          />
        </React.Fragment>
      </Switch>
    </Router>
  );
}

export default App;
