import React, { Component } from "react";
import ApplicationViews from "./ApplicationViews";
import '../index.css'
import Navigation from "./nav/Navbar";

class HiveMind extends Component {

    state = {
        user: false
      }
    
    
    loggedIn = () => {
        this.setState({
            user: true
        })
    }

    loggedOut = () => {
        this.setState({
            user: false
        })
    }
    
      

    render() {
       return( <>
        <Navigation user={this.state.user} loggedOut={this.loggedOut}/>
        <ApplicationViews loggedIn={this.loggedIn}/>
        </>
       )
    };
}

export default HiveMind;