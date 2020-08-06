// Purpose: To render the navbar and application views

import React, { Component } from "react";
import ApplicationViews from "./ApplicationViews";
import '../index.css'
import Navigation from "./nav/Navbar";
import { isAuthenticated } from '../modules/SimpleAuth'
import APIManager from "../modules/APIManager";
import { withRouter } from "react-router";

class HiveMind extends Component {

    state = {
        user: false,
        users: [],
        addedfriend: false
    }


    componentDidMount() {
        // checks to see if there is anyone logged in when the app loads
        this.setState({
            user: isAuthenticated(),
            addedfriend: false
        })
    }
    
    loggedIn = () => {
        // sets the user in state to true so that the navbar will render
        this.setState({
            user: isAuthenticated()
        })
    }

    loggedOut = () => {
        // sets the user in state to false so that the navbar will not render
        this.setState({
            user: isAuthenticated()
        })
    }

    searchUsers = (first,last) => {
        // this function is called by the navbar when a user searches for other users. It makes a fetch call to the DB that gets all users with the name that the current user is searching for
        APIManager.getAllAuth(`applicants?user_first=${first}&&user_last=${last}`)
        .then((users) => {
            // sets users in state so they can be passed to application views and then the searchUsers component
            this.setState({
                users: users,
                searchFirstName: first,
                searchLastName: last
            })
            // push to search users
            this.props.history.push('/searchusers')
        })
    }



    render() {
        return (<>
            <Navigation searchUsers={this.searchUsers} user={this.state.user} loggedOut={this.loggedOut} />
            <ApplicationViews users={this.state.users} loggedIn={this.loggedIn}  />
        </>
        )
    };
}

export default withRouter(HiveMind);