import { Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
import Login from "./auth/Login";
import Register from "./auth/Register"
// import Register from "./auth/Register";
import { isAuthenticated } from "../modules/SimpleAuth";
import Home from "./home/Home";
import NewInterviewForm  from './interviews/InterviewForm'
import MyInterviews from "./interviews/MyInterviews";
import EditInterviewForm from "./interviews/InterviewEditForm";
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
        <Route
          exact path="/" render={props => {
            if (isAuthenticated()) {
                return <Home
                {...props} {...this.props} />
            } else {
                return <Redirect to='/login' />
              
            }

          }}
         /> 
        <Route
          exact path="/interview/new" render={props => {
            if (isAuthenticated()) {
                return <NewInterviewForm
                {...props} {...this.props} />
            } else {
                return <Redirect to='/login' />
              
            }

          }}
         /> 
        <Route
          exact path="/myinterviews" render={props => {
            if (isAuthenticated()) {
                return <MyInterviews
                {...props} {...this.props} />
            } else {
                return <Redirect to='/login' />
              
            }

          }}
         /> 
        <Route
          exact path="/interview/:interviewId(\d+)/edit" render={props => {
            if (isAuthenticated()) {
                return <EditInterviewForm
                {...props} {...this.props} />
            } else {
                return <Redirect to='/login' />
              
            }

          }}
         /> 

      </React.Fragment>
    );
  }
}