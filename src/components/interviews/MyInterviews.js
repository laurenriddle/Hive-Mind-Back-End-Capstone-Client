import React, { Component } from "react"
import { Link } from 'react-router-dom'
import APIManager from '../../modules/APIManager'
import { Button } from 'react-bootstrap'
import InterviewCard from "./InterviewCard"
class MyInterviews extends Component {
    state = {
        interviews: []
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
                <Link to="/interview/new"><Button>New Interview</Button></Link>
                {this.state.interviews.map((interview) => {
                    return <InterviewCard {...this.props} key={interview.id} interview={interview} deleteInterview={this.deleteInterview} />
                })}

            </>
        )
    }
}
export default MyInterviews