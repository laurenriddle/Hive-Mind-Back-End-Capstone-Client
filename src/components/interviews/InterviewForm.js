// Purpose: To create the interview form and execute the logic associated 

import React, { Component } from "react"
import { Link } from 'react-router-dom'
import APIManager from '../../modules/APIManager'
import { Button, FormControl, FormLabel, Form, InputGroup } from 'react-bootstrap'
class NewInterviewForm extends Component {
    state = {
        company: "",
        offer: "",
        position: "",
        date: "",
        review: "",
        advice: "",
        interview_type: "",
        in_person: "",
        code_challege: "",
        companies: []
    }

    handleInputChange = (evt) => {
        let stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    componentDidMount() {
        // gets all companies for the dropdown
        APIManager.getAllAuth("companies")
            .then((companies) => {
                // sets the companies in state
                this.setState({
                    companies: companies
                })
            })
    }

    createInterview = () => {

        // defines the interview object that will be submitted to the DB
        const interview = {
            company_id: this.state.company,
            offer: this.state.offer,
            position: this.state.position,
            date: this.state.date,
            review: this.state.review,
            advice: this.state.advice,
            interview_type: this.state.interview_type,
            in_person: this.state.in_person,
            code_challege: this.state.code_challege
        }

        // checks to see if the user filled out the entire form
        if (this.state.company !== "" && this.state.offer !== "" && this.state.position !== "" && this.state.date !== "" && this.state.advice !== "" && this.state.interview_type !== "" && this.state.in_person !== "" && this.state.code_challege !== "") {
            // makes a post to the interviews table
            APIManager.post("interviews", interview)
            .then(() => {
                // pushes the user to their my interviews page
                this.props.history.push("/myinterviews")
            })
        } else {
            // tiggers alerts if the user has not filled out a field in the form
            if (this.state.company === "") {
                alert('Please select a company.')
            } else if (this.state.position === "" ) {
                alert('Please tell us what position you interviewed for.')
            } else if (this.state.date === "") {
                alert('Please select a date.')
            } else if (this.state.interview_type === "") {
                alert('Please tell use what type of interview you had.')
            } else if (this.state.in_person === "") {
                alert('Please tell us if this interview was in person or online/video conference.')
            } else if (this.state.code_challege === "") {
                alert('Please tell us if there was a coding challenge in this interview.')
            } else if (this.state.offer === "") {
                alert('Please tell us if you received an offer as a result of this interview.')
            } else if (this.state.advice === "") {
                alert('Please enter some advice for fellow job hunters.')
            } 
        }
    }
    render() {

        return (
            <>
                <Form>
                    <select
                        onChange={this.handleInputChange}
                        id="company">
                            <option key="0" value="">Select Company</option>
                        {this.state.companies.map((company) => {
                            return <option key={company.id} value={company.id}>{company.name} ({company.city})</option>
                        })}

                    </select>
                    <Link to="/company/new">Don't see your company? Add a new one here!</Link>

                    <FormControl
                        id="position"
                        onChange={this.handleInputChange}
                        placeholder="What position did you apply for?"
                        type="text"></FormControl>

                    <FormControl
                        id="date"
                        onChange={this.handleInputChange}
                        type="date"></FormControl>

                    <FormControl
                        id="interview_type"
                        onChange={this.handleInputChange}
                        placeholder="Interview Type (i.e. second interview - technical, first interview - behavioral)"
                        type="text"></FormControl>

                    <FormLabel>Was this interview in person?</FormLabel>
                    <InputGroup>
                        <FormControl
                            id="in_person"
                            onChange={this.handleInputChange}
                            type="radio" name="inperson" value="True"></FormControl>
                        <FormLabel>Yes</FormLabel>
                        <FormControl
                            id="in_person"
                            onChange={this.handleInputChange}
                            type="radio" name="inperson" value="False"></FormControl>
                        <FormLabel>No</FormLabel>
                    </InputGroup>

                    <FormLabel>Was there a code challenge?</FormLabel>
                    <InputGroup>
                        <FormControl
                            id="code_challege"
                            onChange={this.handleInputChange}
                            type="radio" name="codechallenge" value="True"></FormControl>
                        <FormLabel>Yes</FormLabel>
                        <FormControl
                            id="code_challege"
                            onChange={this.handleInputChange}
                            type="radio" name="codechallenge" value="False"></FormControl>
                        <FormLabel>No</FormLabel>
                    </InputGroup>

                    <FormLabel>Did you recieve and offer from this company as a result of this interview?</FormLabel>
                    <InputGroup>
                        <FormControl
                            id="offer"
                            onChange={this.handleInputChange}
                            type="radio" name="offer" value="True"></FormControl>
                        <FormLabel>Yes</FormLabel>
                        <FormControl
                            id="offer"
                            onChange={this.handleInputChange}
                            type="radio" name="offer" value="False"></FormControl>
                        <FormLabel>No</FormLabel>
                    </InputGroup>
                    <FormControl
                        id="review"
                        placeholder="Please provide a brief review of this company (i.e. Tech Stack, Culture, etc)..."
                        onChange={this.handleInputChange}
                        as="textarea" rows="5" ></FormControl>

                    <FormControl
                        id="advice"
                        placeholder='Please provide advice for anyone interviewing with this company...'
                        onChange={this.handleInputChange}
                        as="textarea" rows="5" ></FormControl>

                </Form>
                <Button onClick={() => this.createInterview()}>Submit Survey</Button>
            </>
        )
    }
}
export default NewInterviewForm