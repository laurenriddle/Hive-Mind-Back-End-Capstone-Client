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
        // checks to see if there is anyone logged in
        this.setState({
            user: isAuthenticated()
        })
    }
    loggedIn = () => {
        // sets the user in state to true
        this.setState({
            user: isAuthenticated()
        })
    }

    loggedOut = () => {
        // sets the user in state to false

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