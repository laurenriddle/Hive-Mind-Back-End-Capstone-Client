import React, { Component } from "react"
import { Link } from 'react-router-dom'
import APIManager from '../../modules/APIManager'
import { Button } from 'react-bootstrap'
import InterviewCard from "./InterviewCard"
class MyInterviews extends Component {
    state = {
        interviews:[]
    }

    handleInputChange = (evt) => {
        let stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    componentDidMount() {
        // gets all companies for the dropdown
        APIManager.getAllAuth("interviews?applicant=true")
            .then((interviews) => {
                // sets the companies in state
                this.setState({
                    interviews: interviews
                })
            })
    }

    deleteInterview = (id) => {
        APIManager.delete("interviews", id)
        .then(() => {
            APIManager.getAllAuth("interviews?applicant=true")
            .then((interviews) => {
                // sets the companies in state
                this.setState({
                    interviews: interviews
                })
            })

        })
    }

    
    render() {

        return (
            <>
            <Link to="/interview/new"><Button>New Interview</Button></Link>
            {this.state.interviews.map((interview) => {
                return <InterviewCard {...this.props} key={interview.id} interview={interview} deleteInterview={this.deleteInterview}/>
            })}

            </>
        )
    }
}
export default MyInterviews