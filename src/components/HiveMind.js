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
        users: []
    }


    componentDidMount() {
        // checks to see if there is anyone logged in when the app loads
        this.setState({
            user: isAuthenticated()
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
        APIManager.getAllAuth(`applicants?user_first=${first}&&user_last=${last}`)
        .then((users) => {
            this.setState({
                users: users
            })
            this.props.history.push('/searchusers')
        })
    }


    render() {
        return (<>
            <Navigation searchUsers={this.searchUsers} user={this.state.user} loggedOut={this.loggedOut} />
            <ApplicationViews users={this.state.users} loggedIn={this.loggedIn} />
        </>
        )
    };
}

export default withRouter(HiveMind);