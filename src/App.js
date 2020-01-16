import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";

//Redux Stuff
import { Provider } from "react-redux";
import store from "./Redux/store";
import setAuthToken from "./Redux/utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./Redux/actions/authActions";

import routes from "./routes";
import withTracker from "./withTracker";

import PrivateRoute from "./PrivateRoute";

import "bootstrap/dist/css/bootstrap.min.css";
import "./shards-dashboard/styles/shards-dashboards.1.1.0.min.css";

//Component Imports
import Dashboard from "./views/BlogOverview";
import UserProfileLite from "./views/UserProfileLite";
import AddNewPost from "./views/AddNewPost";
import Errors from "./views/Errors";
import ComponentsOverview from "./views/ComponentsOverview";
import Users from "./views/Users";
import BlogPosts from "./views/BlogPosts";
import Register from "./components/Register";
import Login from "./components/Login";
import Success from "./views/Success"
import Cancel from "./views/Cancel"
// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }
}

export default () => (
  <Provider store={store}>
    <Router basename={process.env.REACT_APP_BASENAME || ""}>
      <div>
        {routes.map((route, index) => {
          return (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              component={withTracker(props => {
                return (
                  <route.layout {...props}>
                    <route.component {...props} />
                  </route.layout>
                );
              })}
            />
          );
        })}
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/success" component={Success} />
        <Route exact path="/cancel" component={Cancel} />

        {/* <Route exact path="/Dashboard" component={Dashboard} /> */}

        <Switch>
          <PrivateRoute exact path="/" component={Dashboard} />
        </Switch>
      </div>
    </Router>
  </Provider>
);
