// Purpose: To create the my interviews page, render the interview cards, and execute the logic associated 

import React, { Component } from "react"
import { Link } from 'react-router-dom'
import APIManager from '../../modules/APIManager'
import { Button } from 'react-bootstrap'
import InterviewCard from "./InterviewCard"
class MyInterviews extends Component {
    state = {
        interviews: [],
        companies: []
    }

    handleInputChange = (evt) => {
        let stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    componentDidMount() {
        // gets all interviews for the specific user
        APIManager.getAllAuth("interviews?applicant=true")
            .then((interviews) => {
                // sets the interviews in state
                this.setState({
                    interviews: interviews
                })
            })
        // Gets all companies to load filter system
        APIManager.getAllAuth("companies")
        .then((companies) => {
            // sets companies in state
            this.setState({
                companies: companies
            })
        })
    }

    deleteInterview = (id) => {
        // confirm the user wants to delete the interview
        if (window.confirm("Are you sure you want to delete this interview?")) {
            // make a DELETE request to the DB for the selected interview
            APIManager.delete("interviews", id)
                .then(() => {
                    // get all interviews again
                    APIManager.getAllAuth("interviews?applicant=true")
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
                <Button onClick={() => this.props.history.push('/interview/new')}>+ New</Button>
                {this.state.interviews.map((interview) => {
                    return <InterviewCard {...this.props} key={interview.id} interview={interview} deleteInterview={this.deleteInterview} />
                })}

            </>
        )
    }
}
export default MyInterviews