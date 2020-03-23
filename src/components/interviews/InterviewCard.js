// Purpose: To create the card for a single interview that will render on the my interviews page

import { Card } from "react-bootstrap";
import React, { Component } from 'react'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class InterviewCard extends Component {
// this component creates the card for the my interviews page

    render() {
        return (
            <>
                <Card className="interview-review-card">
                    <Card.Title>
                    <span className="bolder"> {this.props.interview.company.name}</span>
                        <FontAwesomeIcon className="favorite" icon={faEdit} onClick={() => { this.props.history.push(`/interview/${this.props.interview.id}/edit`) }}/>
                        <FontAwesomeIcon className="favorite" icon={faTrash} onClick={() => this.props.deleteInterview(this.props.interview.id)}/>
                    </Card.Title>
                    <Card.Body>
                        <Card.Text><span className="bolder">Interview Date:</span> {this.props.interview.date}</Card.Text>
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
export default InterviewCard