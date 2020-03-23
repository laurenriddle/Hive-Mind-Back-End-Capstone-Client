// Purpose: To create the home page 

import React, { Component } from "react"
import APIManager from '../../modules/APIManager'
import {Button} from 'react-bootstrap'
import "./Home.css"
import Logo from "./Hive_Loge.png"
class Home extends Component {
    state = {
        first_name: ""
    }
    componentDidMount() {
        // gets the applicant's information
        APIManager.getAllAuth("applicants?applicant=true")
            .then((applicant) => {
                // sets the first name in state so it can be displayed on the home page
                this.setState({
                    first_name: applicant[0].user.first_name
                })
            })
    }
    render() {

        return (
            <>
                <center><img src={Logo} alt="logo" className="home-logo" width="300" height="300" ></img></center>
                <h1 className="welcome-banner">Hello, {this.state.first_name}</h1>
                <div className="home-button-container">
                <Button id="home-button" onClick={() => this.props.history.push("/search")}>Search Companies</Button>
                <Button id="home-button" onClick={() => this.props.history.push("/interview/new")}>New Interview</Button>
                </div>
            </>
        )
    }
}
export default Home