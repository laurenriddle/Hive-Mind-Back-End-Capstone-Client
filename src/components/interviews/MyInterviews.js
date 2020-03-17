// Purpose: To create the my interviews page, render the interview cards, and execute the logic associated 

import React, { Component } from "react"
import { Link } from 'react-router-dom'
import APIManager from '../../modules/APIManager'
import { Button, ButtonGroup, ButtonToolbar } from 'react-bootstrap'
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

    // this function searches an array to make sure the object does not already exist
    pushEntry = (array, item) => {
        // if the object does not already exist in the array, push the object into the array
        if (!array.find(({ id }) => id === item.id)) {
            array.push(item);
        }
    }

    componentDidMount() {
        // gets all interviews for the specific user
        APIManager.getAllAuth("interviews?applicant=true")
            .then((interviews) => {
                let companies = []
                interviews.map((interview) => {
                    // if the company is not already in the companies array, put it in there
                    this.pushEntry(companies, interview.company)
                })
                // sets the interviews and companies in state
                this.setState({
                    interviews: interviews,
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
                    // gets all interviews for the specific user
                   this.getAllInterviews()

                })
        }
    }

    filterInterviews = (id) => {
        // gets all interviews for the company that was picked
        APIManager.getAllAuth(`interviews?applicant=true&&company=${id}`)
            .then((interviews) => {
                // sets the interviews in state
                this.setState({
                    interviews: interviews
                })
            })
    }

    getAllInterviews = () => {
        APIManager.getAllAuth("interviews?applicant=true")
            .then((interviews) => {
                let companies = []
                interviews.map((interview) => {
                    // if the company is not already in the companies array, put it in there
                    this.pushEntry(companies, interview.company)
                })
                // sets the interviews and companies in state
                this.setState({
                    interviews: interviews,
                    companies: companies
                })
            })
    }

    render() {

        return (
            <>
                {this.state.companies.length > 0 &&
                    <>
                        <label>Filter by Company:</label>
                        <ButtonToolbar aria-label="Toolbar with button groups">
                            <ButtonGroup className="mr-2" aria-label="First group">
                                <Button onClick={() => this.getAllInterviews()}>All</Button>
                                {this.state.companies.map((company) => {
                                    return <Button key={company.id} onClick={() => this.filterInterviews(company.id)}>{company.name}</Button>
                                })}
                            </ButtonGroup>
                        </ButtonToolbar>
                    </>
                }
                <Button onClick={() => this.props.history.push('/interview/new')}>+ New</Button>
                {this.state.interviews.map((interview) => {
                    return <InterviewCard {...this.props} key={interview.id} interview={interview} deleteInterview={this.deleteInterview} />
                })}

            </>
        )
    }
}
export default MyInterviews