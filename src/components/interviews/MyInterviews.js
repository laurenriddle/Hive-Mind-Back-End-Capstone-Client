// Purpose: To create the my interviews page, render the interview cards, and execute the logic associated 

import React, { Component } from "react"
import APIManager from '../../modules/APIManager'
import { Button, ButtonGroup, ButtonToolbar } from 'react-bootstrap'
import InterviewCard from "./InterviewCard"
import "./Interviews.css"
class MyInterviews extends Component {
    state = {
        interviews: [],
        companies: [],
        filterId: ""
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
                interviews.forEach((interview) => {
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
                interviews.forEach((interview) => {
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
                <h1 className="my-favorites-header">My Interviews</h1>
                <ButtonToolbar aria-label="Toolbar with button groups">
                    <ButtonGroup className="filter-buttons-toolbar" aria-label="First group">
                        <Button className="filter-buttons" variant="secondary" onClick={() => this.props.history.push('/interview/new')}>+ New</Button>
                    </ButtonGroup>
                </ButtonToolbar>
                <div className="filter-radio-toolbar">
                    {this.state.companies.length > 0 &&
                        <>
                            <span className="filterId"><input className="radio-buttons" type="radio" id="filterId" name="company" value="" onClick={() => this.getAllInterviews()}></input><label>All Interviews</label></span>
                            
                            {this.state.companies.map((company) => {
                                return <> <span className="filterId"><input type="radio" className="radio-buttons" name="company" value={company.id} onClick={() => this.filterInterviews(company.id)}></input><label>{company.name}</label></span>
                                </>
                            })}
                        </>
                    }
                </div>
                <section className="interview-cards-container">
                    {this.state.interviews.map((interview) => {
                        return <InterviewCard {...this.props} key={interview.id} interview={interview} deleteInterview={this.deleteInterview} />
                    })}
                </section>
            </>
        )
    }
}
export default MyInterviews