import { Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
import Login from "./auth/Login";
import Register from "./auth/Register"
// import Register from "./auth/Register";
import { isAuthenticated } from "../modules/SimpleAuth";
export default class ApplicationViews extends Component {

  render() {
    return (
      <React.Fragment>


        <Route
          exact path="/login" render={props => {
            if (isAuthenticated()) {
              return <Redirect to='/' />
            } else {
              return <Login
                {...props} {...this.props} loggedIn={this.props.loggedIn} />
            }
          }}
        />
        <Route
          exact path="/register" render={props => {
            if (isAuthenticated()) {
              return <Redirect to='/' />
            } else {
              return <Register
                {...props} {...this.props} loggedIn={this.props.loggedIn} />
            }

          }}
         /> 

      </React.Fragment>
    );
  }
}