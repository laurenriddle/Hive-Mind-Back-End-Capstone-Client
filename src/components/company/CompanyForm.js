// Purpose: To create the new company form and execute the logic associated 

import React, { Component } from "react"
import APIManager from '../../modules/APIManager'
import { Button, FormControl, Form, InputGroup } from 'react-bootstrap'
import "../interviews/Interviews.css"
import "./Company.css"
class NewCompanyForm extends Component {
    state = {
        name: "",
        city: "",
        industry_id: "",
        industries: []
    }

    handleInputChange = (evt) => {
        let stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    componentDidMount() {
        // gets all industries for the dropdown
        APIManager.getAllAuth("industries")
            .then((industries) => {
                // sets the industries in state
                this.setState({
                    industries: industries
                })
            })
    }

    capitalize_Words = (str) => {
        // This function takes a string (in this case, the company name) and capitalizes the first letter of each word in the string
        return str.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
    }

    createCompany = () => {

        // defines the company object that will be submitted to the DB
        const newcompany = {
            name: this.capitalize_Words(this.state.name),
            city: this.state.city,
            industry_id: this.state.industry_id
        }

        // checks to see if the user filled out the entire form
        if (this.state.name !== "" && this.state.industry_id !== "" && this.state.city !== "") {

            // gets all companies already in the DB
            APIManager.getAllAuth("companies")
                .then((companies) => {
                    // checks to see if there is already a company with the company name that's in state or a name that is close to it.
                    let searchcompanies = companies.find(company => company['name'].includes(this.capitalize_Words(this.state.name)));

                    if (searchcompanies !== undefined) {
                        //  if the search companies function finds a company that matches, it will ask the user if they are sure they want to create another company like it
                        if (window.confirm(`A company with the name of ${searchcompanies.name} already exists. Are you sure you want to create another company called ${this.capitalize_Words(this.state.name)}?`)) {
                            // if the user confirms, this makes a post to the companies table
                            APIManager.post("companies", newcompany)
                                .then(() => {
                                    if (this.props.location.state !== undefined) {
                                        // pushes the user back to the edit form
                                        this.props.history.push(`/interview/${this.props.location.state.interviewId}/edit`)

                                    } else {
                                        // pushes the user to the new interview form
                                        this.props.history.push("/interview/new")
                                    }
                                })
                        }
                    } else {
                        // makes a post to the companies table
                        APIManager.post("companies", newcompany)
                            .then(() => {
                                // checks to see if the user came from the edit form or the new interview form
                                if (this.props.location.state !== undefined) {
                                    // pushes the user back to the edit form
                                    this.props.history.push(`/interview/${this.props.location.state.interviewId}/edit`)

                                } else {
                                    // pushes the user to the new interview form
                                    this.props.history.push("/interview/new")
                                }
                            })
                    }
                })
        } else {
            // tiggers alerts if the user has not filled out all fields in the form
            if (this.state.name === "") {
                alert('Please provide a company name.')
            } else if (this.state.city === "") {
                alert('Please provide a city.')
            } else if (this.state.industry_id === "") {
                alert('Please select an industry.')
            }
        }
    }
    render() {

        return (
            <>
                <section className="new-int-form-container">
                    <Form className="interview-form">
                        <h2 className="righteous yellow">New Company</h2><hr />
                        <FormControl
                            id="name"
                            onChange={this.handleInputChange}
                            placeholder="Company"
                            type="text"></FormControl>

                        <FormControl
                            id="city"
                            placeholder="Enter a city (i.e. Nashville, TN)"
                            onChange={this.handleInputChange}
                            type="text"></FormControl>
                        <InputGroup>
                            <select
                                onChange={this.handleInputChange}
                                id="industry_id">
                                <option key="0" value="">Select an Industry</option>
                                {this.state.industries.map((industry) => {
                                    return <option key={industry.id} value={industry.id}>{industry.industry}</option>
                                })}

                            </select>
                        </InputGroup><hr />


                    </Form>
                    <section className="create-int-button-container">
                        <Button className="create-int-button" onClick={() => this.createCompany()}>Create Company</Button>
                        {this.props.location.state === undefined ?
                            <Button className="create-int-button company-button" onClick={() => this.props.history.push("/interview/new")}>Cancel</Button>
                            :
                            <Button className="create-int-button company-button" onClick={() => this.props.history.push(`/interview/${this.props.location.state.interviewId}/edit`)}>Cancel</Button>
                        }
                    </section>
                </section>
            </>
        )
    }
}
export default NewCompanyForm