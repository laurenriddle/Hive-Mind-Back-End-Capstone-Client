import { Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
import Login from "./auth/Login";
import Register from "./auth/Register"
import { isAuthenticated } from "../modules/SimpleAuth";
import Home from "./home/Home";
import NewInterviewForm  from './interviews/InterviewForm'
import MyInterviews from "./interviews/MyInterviews";
import EditInterviewForm from "./interviews/InterviewEditForm";
import NewCompanyForm from "./company/CompanyForm";
import SearchResults from "./search/SearchResults";
import CompanyDetail from "./search/SearchDetail";
import Profile from "./profile/Profile";
import ProfileEditForm from "./profile/ProfileEditForm";
import MyFavorites from "./favorites/FavoritesList";
import GenericProfile from "./profile/GenericUserProfilePage";
import SearchUsers from "./search/SearchUsers";
import About from "./auth/About";
import MyFriends from "./friends/MyFriendsList"
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
        <Route
          exact path="/company/new" render={props => {
            if (isAuthenticated()) {
                return <NewCompanyForm
                {...props} {...this.props} />
            } else {
                return <Redirect to='/login' />
              
            }

          }}
         /> 
        <Route
          exact path="/search" render={props => {
            if (isAuthenticated()) {
                return <SearchResults
                {...props} {...this.props} />
            } else {
                return <Redirect to='/login' />
              
            }

          }}
         /> 
        <Route
          exact path="/company/:companyId(\d+)" render={props => {
            if (isAuthenticated()) {
                return <CompanyDetail
                {...props} {...this.props} />
            } else {
                return <Redirect to='/login' />
              
            }

          }}
         />
         <Route
          exact path="/profile" render={props => {
            if (isAuthenticated()) {
                return <Profile
                {...props} {...this.props} />
            } else {
                return <Redirect to='/login' />
              
            }

          }}
         /> 
         <Route
          exact path="/profile/edit" render={props => {
            if (isAuthenticated()) {
                return <ProfileEditForm
                {...props} {...this.props} />
            } else {
                return <Redirect to='/login' />
              
            }

          }}
         /> 
         <Route
          exact path="/favorites" render={props => {
            if (isAuthenticated()) {
                return <MyFavorites
                {...props} {...this.props} />
            } else {
                return <Redirect to='/login' />
              
            }

          }}
         /> 
         <Route
          exact path="/profile/:profileId(\d+)" render={props => {
            if (isAuthenticated()) {
                return <GenericProfile
                {...props} {...this.props} />
            } else {
                return <Redirect to='/login' />
              
            }

          }}
         /> 
         <Route
          exact path="/searchusers" render={props => {
            if (isAuthenticated()) {
                return <SearchUsers
                {...props} {...this.props} />
            } else {
                return <Redirect to='/login' />
              
            }

          }}
         /> 
         <Route
          exact path="/myfriends" render={props => {
            if (isAuthenticated()) {
                return <MyFriends
                {...props} {...this.props} />
            } else {
                return <Redirect to='/login' />
              
            }

          }}
         /> 
         <Route
          exact path="/about" render={props => {
            if (isAuthenticated()) {
              return <Redirect to='/' />
            } else {
              return <About
              {...props} {...this.props} />
              
            }

          }}
         /> 

      </React.Fragment>
    );
  }
}