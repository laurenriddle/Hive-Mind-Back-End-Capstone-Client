// Purpose: To create the profile page

import React, { Component } from "react"
import APIManager from '../../modules/APIManager'
import { Button, Jumbotron } from 'react-bootstrap'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Profile.css'
import { Link } from "react-router-dom";
class Profile extends Component {
    state = {
        applicant: {},
        user: {},
        cohort: {},
        friends:[]
    }
    componentDidMount() {
        // gets the applicant's information
        APIManager.getAllAuth("applicants?applicant=true")
            .then((applicant) => {
                // sets the applicant in state so it can be displayed on the profile page
                this.setState({
                    applicant: applicant[0],
                    user: applicant[0].user,
                    cohort: applicant[0].cohort
                })
            })
        APIManager.getAllAuth("friends?applicant=true")
        .then((friends) => {
            // sets the friends in state so it can be displayed on the profile page
            this.setState({
                friends: friends
            })
        })
    }

    render() {

        return (
            <>
                <Jumbotron className="user-jumbo">
                    <h1 className="righteous">{this.state.user.first_name} {this.state.user.last_name}</h1>
                    <h5>@{this.state.user.username}</h5>
                    <h5>{this.state.applicant.jobtitle} 
                    {this.state.applicant.employer !== null && this.state.applicant.employer !== "" &&
                        <> at {this.state.applicant.employer}
                        </>

                    }
                    </h5>
                    <Link class="friends-following">{this.state.friends.length} Following</Link>

                </Jumbotron>
                {this.state.applicant.image !== null ?
                    <img src={this.state.applicant.image} alt="user" className="profile-image"></img>
                    :
                    <FontAwesomeIcon icon={faUser} />
                }
                    <section className="edit-button-container">
                        <Button onClick={() => this.props.history.push('/profile/edit')} className="profile-button">Edit</Button>
                    </section>
                <section className="about">
                    <h3 className="righteous">About</h3><hr className="hr" />
                    <h6>{this.state.cohort.cohort}</h6>
                    <h6>Location: {this.state.applicant.location}</h6>
                    {this.state.applicant.is_employed ?
                        <h6>Employment Status: Hired</h6>
                        :
                        <h6>Employment Status: Looking for Opportunities</h6>
                    }
                    <p> {this.state.applicant.aboutme}</p>
                    {/* {this.state.user.id === this.state.loggedInUserId &&
                        <Button onClick={() => this.props.history.push('/profile/edit')}>Edit</Button>
                    } */}
                    <h3 className="righteous">Contact</h3><hr className="hr" />
                    <h6>{this.state.user.email}</h6>
                    <a href={this.state.applicant.linkedin_profile} target="_blank" rel="noopener noreferrer" className="linkedin">View LinkedIn Profile</a>
                </section>
            </>
        )
    }
}
export default Profile