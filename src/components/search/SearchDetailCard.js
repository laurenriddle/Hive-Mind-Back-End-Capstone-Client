// Purpose: To create the interivew card for the company details page. This is rendered by Search Details component

import { Card } from "react-bootstrap";
import { Link } from 'react-router-dom'
import React, { Component } from 'react'
import { faEdit, faTrash, faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import APIManager from "../../modules/APIManager";
import "./Search.css"
class SearchDetailCard extends Component {
    state = {
        user: {}
    }

    componentDidMount() {
        // this gets the current user when the component mounts so that we can conditionally render the edit and delete buttons
        APIManager.getAllAuth("applicants?applicant=true")
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
                <Card className="interview-review-card">
                    <Card.Title>
                        {this.state.user.id !== this.props.interview.applicant.id &&
                            <>
                                <img src={this.props.interview.applicant.image} alt="profile" width="50" height="50" onClick={() => this.props.history.push(`/profile/${this.props.interview.applicant.id}`)}></img>
                                <Link to={`/profile/${this.props.interview.applicant.id}`} className="interview-card-username">{this.props.user.first_name} {this.props.user.last_name} </Link>
                            </>
                        }

                        {this.state.user.id === this.props.interview.applicant.id &&
                            <>
                                <img src={this.props.interview.applicant.image} alt="profile" width="50" height="50" onClick={() => this.props.history.push(`/profile`)}></img>
                                <Link to={`/profile`} className="interview-card-username"> {this.props.user.first_name} {this.props.user.last_name} </Link>
                            </>
                        }

                        {this.state.user.id === this.props.interview.applicant.id &&
                            <>
                                <FontAwesomeIcon className="favorite" icon={faEdit} onClick={() => { this.props.history.push(`/interview/${this.props.interview.id}/edit`) }} /> <FontAwesomeIcon className="favorite" icon={faTrash} onClick={() => this.props.deleteInterview(this.props.interview.id)} />
                            </>
                        }
                        {(this.state.user.id !== this.props.interview.applicant.id && this.isFavorite(this.props.interview.id) === false) &&
                            <FontAwesomeIcon icon={faStar} className="favorite" onClick={() => this.props.addFavorite(this.props.interview.id)} />}

                        {(this.state.user.id !== this.props.interview.applicant.id && this.isFavorite(this.props.interview.id) === true) && <FontAwesomeIcon className="favorited" icon={faStar} onClick={() => this.props.deleteFavorite(this.props.interview.id)} />
                        }

                    </Card.Title>
                    <Card.Body>
                        <Card.Text><span className="bolder">Interview Date:</span> {this.props.interview.date}</Card.Text>
                        <Card.Text><span className="bolder">Company:</span> {this.props.interview.company.name} ({this.props.interview.company.industry.industry})</Card.Text>
                        <Card.Text><span className="bolder">Position:</span> {this.props.interview.position}</Card.Text>
                        <Card.Text><span className="bolder">Interview Type:</span> {this.props.interview.interview_type}</Card.Text>

                        {this.props.interview.in_person === true &&
                            <Card.Text><span className="bolder">In Person:</span> Yes</Card.Text>}
                        {this.props.interview.in_person === false &&
                            <Card.Text><span className="bolder">In Person:</span> No</Card.Text>}

                        {this.props.interview.offer === true &&
                            <Card.Text><span className="bolder">Offer Received:</span> Yes</Card.Text>}
                        {this.props.interview.offer === false &&
                            <Card.Text><span className="bolder">Offer Received:</span> No</Card.Text>}

                        {this.props.interview.code_challege === true &&
                            <Card.Text><span className="bolder">Coding Challenge:</span> Yes</Card.Text>}
                        {this.props.interview.code_challege === false &&
                            <Card.Text><span className="bolder">Coding Challenge:</span> No</Card.Text>}

                        <Card.Text><span className="bolder">Review:</span> {this.props.interview.review}</Card.Text>

                        <Card.Text><span className="bolder">Advice:</span> {this.props.interview.advice}</Card.Text>
                    </Card.Body>
                </Card>

            </>
        )
    }
}
export default SearchDetailCard