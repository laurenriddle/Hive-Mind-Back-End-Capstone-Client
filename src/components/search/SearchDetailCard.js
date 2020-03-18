// Purpose: To create the interivew card for the company details page. This is rendered by Search Detail

import { Card } from "react-bootstrap";
import React, { Component } from 'react'
import { faEdit, faTrash, faUser, faStar, faAddressBook } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import APIManager from "../../modules/APIManager";

class SearchDetailCard extends Component {
    state = {
        user: {}
    }

    componentDidMount() {
        // this gets the current user when the component mounts so that we can conditionally render the edit and delete buttons
        APIManager.getAllAuth("applicants")
            .then((user) => {
                // sets the user in state
                this.setState({
                    // user[0] grabs the first (and only) user in the array
                    user: user[0]
                })
            })

    }

    isFavorite = (id) => {
        // this function checks to see if the interview is already favorited by the user.
        let favorite = false
        for (let i = 0; i < this.props.favorites.length; i++) {
            if (this.props.favorites[i].interview.id === id) {
                // if interview is a favorite, return true
                favorite = true
                return favorite;
            }
        }
        return favorite
    }

    render() {
        return (
            <>
                <Card>
                    <Card.Title><a href={this.props.interview.applicant.linkedin_profile} rel="noopener noreferrer" target="_blank"><FontAwesomeIcon icon={faUser} /></a> {this.props.user.first_name} {this.props.user.last_name} {this.props.interview.date}
                        {this.state.user.id === this.props.interview.applicant.id &&
                            <>
                                <button onClick={() => { this.props.history.push(`/interview/${this.props.interview.id}/edit`) }}><FontAwesomeIcon icon={faEdit} /></button><button onClick={() => this.props.deleteInterview(this.props.interview.id)}><FontAwesomeIcon icon={faTrash} /></button>
                            </>
                        }
                        {(this.state.user.id !== this.props.interview.applicant.id && this.isFavorite(this.props.interview.id) === false) &&
                            <button onClick={() => this.props.addFavorite(this.props.interview.id)}><FontAwesomeIcon icon={faStar} /></button>}

                        {(this.state.user.id !== this.props.interview.applicant.id && this.isFavorite(this.props.interview.id) === true) && <button onClick={() => this.props.deleteFavorite(this.props.interview.id)}><FontAwesomeIcon icon={faAddressBook} /></button>
                        }
                    </Card.Title>
                    <Card.Body>
                        <Card.Text>Company: {this.props.interview.company.name} ({this.props.interview.company.industry.industry})</Card.Text>
                        <Card.Text>Position: {this.props.interview.position}</Card.Text>
                        <Card.Text>Interview Type: {this.props.interview.interview_type}</Card.Text>

                        {this.props.interview.in_person === true &&
                            <Card.Text>In Person: Yes</Card.Text>}
                        {this.props.interview.in_person === false &&
                            <Card.Text>In Person: No</Card.Text>}

                        {this.props.interview.offer === true &&
                            <Card.Text>Offer Received: Yes</Card.Text>}
                        {this.props.interview.offer === false &&
                            <Card.Text>Offer Received: No</Card.Text>}

                        {this.props.interview.code_challege === true &&
                            <Card.Text>Coding Challenge: Yes</Card.Text>}
                        {this.props.interview.code_challege === false &&
                            <Card.Text>Coding Challenge: No</Card.Text>}

                        <Card.Text>Review: {this.props.interview.review}</Card.Text>

                        <Card.Text>Advice: {this.props.interview.advice}</Card.Text>
                    </Card.Body>
                </Card>

            </>
        )
    }
}
export default SearchDetailCard