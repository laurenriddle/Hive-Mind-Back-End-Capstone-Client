import { Card } from "react-bootstrap";
import React, { Component } from 'react'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class InterviewCard extends Component {


    render() {
        return (
            <>
                <Card>
                    <Card.Title>
                        {this.props.interview.company.name} {this.props.interview.date}
                        <button onClick={() => { this.props.history.push(`/interview/${this.props.interview.id}/edit`) }}><FontAwesomeIcon icon={faEdit} /></button>
                        <button onClick={() => this.props.deleteInterview(this.props.interview.id)}><FontAwesomeIcon icon={faTrash} /></button>
                    </Card.Title>
                    <Card.Body>
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
export default InterviewCard