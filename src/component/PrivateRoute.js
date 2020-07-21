import React from "react";
import { Route, Redirect } from "react-router-dom";

export default function PrivateRoute({ children, isSignedIn, ...rest }) {
  if (isSignedIn) {
    return <Route {...rest} />;
  }
  return (
    <Redirect
      to={{
        pathname: "/login",
      }}
    />
  );
}
