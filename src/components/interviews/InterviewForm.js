import React, { Component } from "react"
import { Link } from 'react-router-dom'
import APIManager from '../../modules/APIManager'
import { Button, FormControl, FormLabel, Form, InputGroup } from 'react-bootstrap'
class NewInterviewForm extends Component {
    state = {
        company: "1",
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
    render() {

        return (
            <>
                <Form>
                    <select
                        onChange={this.handleInputChange}
                        id="company">
                        {this.state.companies.map((company) => {
                            return <option key={company.id} value={company.id}>{company.name} ({company.city})</option>
                        })}

                    </select>

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

            </>
        )
    }
}
export default NewInterviewForm