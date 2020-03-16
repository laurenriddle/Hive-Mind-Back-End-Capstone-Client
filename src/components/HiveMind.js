// Purpose: To render the navbar and application views

import React, { Component } from "react";
import ApplicationViews from "./ApplicationViews";
import '../index.css'
import Navigation from "./nav/Navbar";
import { isAuthenticated } from '../modules/SimpleAuth'
class HiveMind extends Component {

    state = {
        user: false
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



    render() {
        return (<>
            <Navigation user={this.state.user} loggedOut={this.loggedOut} />
            <ApplicationViews loggedIn={this.loggedIn} />
        </>
        )
    };
}

export default HiveMind;