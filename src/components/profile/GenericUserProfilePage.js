// Purpose: To create the profile page

import React, { Component } from "react"
import APIManager from '../../modules/APIManager'
import { Button, Jumbotron } from 'react-bootstrap'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Profile.css'
import SearchDetailCard from "../search/SearchDetailCard";

class GenericProfile extends Component {
    state = {
        applicant: {},
        user: {},
        cohort: {},
        interviews: [],
        favorites: [],
        loggedInUserId: null,
    }

    componentDidMount() {
        // gets the applicant's information
        APIManager.getAllAuth(`applicants/${this.props.match.params.profileId}`)
            .then((applicant) => {
                // sets the applicant in state so it can be displayed on the profile page
                this.setState({
                    applicant: applicant,
                    user: applicant.user,
                    cohort: applicant.cohort
                })
            })
        APIManager.getAllAuth(`interviews?review=${this.props.match.params.profileId}`)
            .then((interviews) => {
                // sets the applicant in state so it can be displayed on the profile page
                this.setState({
                    interviews: interviews
                })
            })
        // get all favorites relationships and set them in state so that the cards will render the correct buttons
        APIManager.getAllAuth("favorites?applicant=true")
            .then((favorites) => {
                // set favorites in state
                this.setState({
                    favorites: favorites
                })
            })
        //  gets current logged in user
        APIManager.getAllAuth("applicants")
            .then((applicant) => {
                // sets the applicant in state so it can be displayed on the profile page
                this.setState({
                    loggedInUserId: applicant[0].user.id,
                })
            })
    }

    deleteFavorite = (id) => {
        // get the favorite to that you have the relationship ID
        APIManager.getAllAuth(`favorites?interview=${id}&&applicant=true`)
            .then((relationship) => {
                // make a DELETE request to the DB for the selected favorite
                APIManager.delete("favorites", relationship[0].id)
                    .then(() => {
                        // gets all favorites for the specific user
                        this.getAllFavorites()

                    })

            })

    }

    addFavorite = (id) => {
        let favorite = {
            interview_id: id
        }
        // add the favorite to the user's list
        APIManager.post(`favorites`, favorite)
            .then(() => {
                // gets all favorites for the specific user
                this.getAllFavorites()
            })
    }

    getAllFavorites = () => {
        // get all favorites relationships and set them in state so that the cards will render the correct buttons
        APIManager.getAllAuth("favorites?applicant=true")
            .then((favorites) => {
                // set favorites in state
                this.setState({
                    favorites: favorites
                })
            })
    }

    deleteInterview = (id) => {
        // confirm the user wants to delete the interview
        if (window.confirm("Are you sure you want to delete this interview?")) {
            // make a DELETE request to the DB for the selected interview
            APIManager.delete("interviews", id)
                .then(() => {
                    // get all interviews for this particular company again
                    APIManager.getAllAuth(`interviews?company=${this.props.match.params.companyId}`)
                        .then((interviews) => {
                            // update state with interviews
                            this.setState({
                                interviews: interviews
                            })
                        })

                })
        }
    }

    render() {

        return (
            <>
                <Jumbotron>
                    <h1>{this.state.user.first_name} {this.state.user.last_name}</h1>
                    <h3>AKA {this.state.user.username}</h3>
                    <p>{this.state.applicant.aboutme}</p>
                    {this.state.applicant.image !== null ?
                        <img src={this.state.applicant.image} alt="user" className="profile-image"></img>
                        :
                        <FontAwesomeIcon icon={faUser} />
                    }
                    {this.state.user.id === this.state.loggedInUserId &&
                        <Button onClick={() => this.props.history.push('/profile/edit')}>Edit</Button>
                    }
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
                </Jumbotron>
                {this.state.interviews.map((interview) => {
                    return <SearchDetailCard favorites={this.state.favorites} {...this.props} key={interview.id} interview={interview} user={interview.applicant.user} deleteInterview={this.deleteInterview} deleteFavorite={this.deleteFavorite} addFavorite={this.addFavorite} />

                })}
            </>
        )
    }
}
export default GenericProfile