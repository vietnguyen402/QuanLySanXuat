import React from "react";
import { Route, Redirect } from "react-router-dom";

export default function PrivateRoute({ children, isSignedIn, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isSignedIn ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
