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
        // This function takes a string and capitalizes the first letter of each word in the string
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
            APIManager.getAllAuth("companies")
                .then((companies) => {
                    // checks to see if there is already a company with the name in state
                    let searchcompanies = companies.find(company => company['name'] === this.capitalize_Words(this.state.name));
                    if (searchcompanies !== undefined) {
                        alert('This company already exists')
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
            // tiggers alerts if the user has not filled out a field in the form
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
                        placeholder="City"
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