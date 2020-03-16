// Purpose: To create the home page 

import React, { Component } from "react"
import {Link} from 'react-router-dom'
import APIManager from '../../modules/APIManager'
import {Button} from 'react-bootstrap'
class Home extends Component {
    state = {
        first_name: ""
    }
    componentDidMount() {
        // gets the applicant's information
        APIManager.getAllAuth("applicants")
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
                <h1>Hello, {this.state.first_name}</h1>
                <Link to="/search"><Button>Search Companies</Button></Link>
                <Link to="/interview/new"><Button>New Interview</Button></Link>
            
            </>
        )
    }
}
export default Home