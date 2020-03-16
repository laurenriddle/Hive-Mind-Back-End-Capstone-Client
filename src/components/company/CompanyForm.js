import React, { Component } from "react"
import { Link } from 'react-router-dom'
import APIManager from '../../modules/APIManager'
import { Button, FormControl, Form } from 'react-bootstrap'
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
                            // makes a post to the companies table
                            APIManager.post("companies", newcompany)
                                .then(() => {
                                    // pushes the user to the new interview page
                                    this.props.history.push("/interview/new")
                                })
                        }
                    } else {
                        // makes a post to the companies table
                        APIManager.post("companies", newcompany)
                            .then(() => {
                                // pushes the user to the new interview page
                                this.props.history.push("/interview/new")
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
                <Form>

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
                    <select
                        onChange={this.handleInputChange}
                        id="industry_id">
                        <option key="0" value="">Select an Industry</option>
                        {this.state.industries.map((industry) => {
                            return <option key={industry.id} value={industry.id}>{industry.industry}</option>
                        })}

                    </select>


                </Form>
                <Button onClick={() => this.createCompany()}>Create Company</Button>
                <Link to="/interview/new">Cancel</Link>
            </>
        )
    }
}
export default NewCompanyForm