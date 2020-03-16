// Purpose: To create the profile page

import React, { Component } from "react"
import APIManager from '../../modules/APIManager'
import { Button } from 'react-bootstrap'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Profile.css'
class Profile extends Component {
    state = {
        applicant: {},
        user: {},
        cohort: {}
    }
    componentDidMount() {
        // gets the applicant's information
        APIManager.getAllAuth("applicants")
            .then((applicant) => {
                // sets the applicant in state so it can be displayed on the profile page
                this.setState({
                    applicant: applicant[0],
                    user: applicant[0].user,
                    cohort: applicant[0].cohort
                })
            })
    }

    render() {

        return (
            <>
                <h1>{this.state.user.first_name} {this.state.user.last_name}</h1>
                <h3>AKA {this.state.user.username}</h3>
                <h5>{this.state.applicant.aboutme}</h5>
                { this.state.applicant.image !== null ?
                <img src={this.state.applicant.image} alt="user"  className="profile-image"></img>
                :
                <FontAwesomeIcon icon={faUser}  />
                }
                <Button onClick={() => this.props.history.push('/profile/edit')}>Edit</Button>
                <h5>{this.state.user.email}</h5>
                <h5>{this.state.cohort.cohort}</h5>
                {this.state.applicant.is_employed ?
                    <h5>Hired Status: Hired</h5>
                    :
                    <h5>Hired Status: Looking for Opportunities</h5>
                }
                {this.state.applicant.employer !== null ?
                    <h5>Employer: {this.state.applicant.employer}</h5>
                    :
                    <></>
                    }
                <a href={this.state.applicant.linkedin_profile} target="_blank" rel="noopener noreferrer">View LinkedIn Profile</a>
            </>
        )
    }
}
export default Profile