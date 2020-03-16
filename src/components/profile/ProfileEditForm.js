// Purpose: To create the interview edit form and execute the logic associated 

import React, { Component } from "react"
import { Link } from 'react-router-dom'
import APIManager from '../../modules/APIManager'
import { Button, FormControl, FormLabel, Form } from 'react-bootstrap'
class ProfileEditForm extends Component {
    state = {
        linkedin_profile: "",
        employer: "",
        is_employed: false,
        email: "",
        first_name: "",
        last_name: "",
        username: "",
        cohort_id: null,
        image: "",
        cohorts: []
    }

    handleInputChange = (evt) => {
        let stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    componentDidMount() {
        // gets applicants information to populate the form
        APIManager.getAllAuth("applicants")
            .then((applicant) => {
                // sets the applicants information in state
                this.setState({
                    linkedin_profile: applicant[0].linkedin_profile,
                    employer: applicant[0].employer,
                    is_employed: applicant[0].is_employed,
                    email: applicant[0].user.email,
                    first_name: applicant[0].user.first_name,
                    last_name: applicant[0].user.last_name,
                    username: applicant[0].user.username,
                    cohort_id: applicant[0].cohort.id,
                    image: applicant[0].image
                })
            })
        
        // gets all cohorts to populate the dropdown 
        APIManager.getAllAuth("cohorts")
            .then((cohorts) => {
                // sets cohorts in state
                this.setState({
                    cohorts: cohorts
                })

            })
    }

    updateProfile = () => {
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
            code_challege: this.state.code_challege,
            id: this.props.match.params.interviewId
        }

        // checks to see if the user filled out the entire form
        if (this.state.company !== "" && this.state.offer !== "" && this.state.position !== "" && this.state.date !== "" && this.state.advice !== "" && this.state.interview_type !== "" && this.state.in_person !== "" && this.state.code_challege !== "") {
            // makes a put to the interviews table
            APIManager.update(`interviews`, interview)
                .then(() => {
                    // pushes the user to their my interviews page
                    this.props.history.push("/myinterviews")
                })
        } else {
            // tiggers alerts if the user has not filled out a field in the form
            if (this.state.company === "") {
                alert('Please select a company.')
            } else if (this.state.position === "") {
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
                        onChange={this.handleInputChange} value={this.state.cohort_id}
                        id="cohort_id">
                        <option key="0" value="">Select Company</option>
                        {this.state.cohorts.map((cohort) => {
                            return <option key={cohort.id} value={cohort.id}>{cohort.name} ({cohort.city})</option>
                        })}

                    </select>

                    <FormControl
                        value={this.state.position}
                        id="position"
                        onChange={this.handleInputChange}
                        placeholder="What position did you apply for?"
                        type="text"></FormControl>

                    <FormControl
                        value={this.state.date}
                        id="date"
                        onChange={this.handleInputChange}
                        type="date"></FormControl>

                    <FormControl
                        value={this.state.interview_type}
                        id="interview_type"
                        onChange={this.handleInputChange}
                        placeholder="Interview Type (i.e. second interview - technical, first interview - behavioral)"
                        type="text"></FormControl>

                    <FormLabel>Was this interview in person?</FormLabel>
                    <fieldset>
                        <input
                            checked={this.state.in_person === true || this.state.in_person === "True"}
                            id="in_person"
                            onChange={this.handleInputChange}
                            type="radio" name="inperson" value="True"></input>
                        <FormLabel>Yes</FormLabel>
                        <input
                            checked={this.state.in_person === false || this.state.in_person === "False"}
                            id="in_person"
                            onChange={this.handleInputChange}
                            type="radio" name="inperson" value="False"></input>
                        <FormLabel>No</FormLabel>
                    </fieldset>

                    <FormLabel>Was there a code challenge?</FormLabel>
                    <fieldset>
                        <input
                            checked={this.state.code_challege === true || this.state.code_challege === "True"}
                            id="code_challege"
                            onChange={this.handleInputChange}
                            type="radio" name="codechallenge" value="True"></input>
                        <FormLabel>Yes</FormLabel>
                        <input
                            checked={this.state.code_challege === false || this.state.code_challege === "False"}
                            id="code_challege"
                            onChange={this.handleInputChange}
                            type="radio" name="codechallenge" value="False"></input>
                        <FormLabel>No</FormLabel>
                    </fieldset>

                    <FormLabel>Did you recieve and offer from this company as a result of this interview?</FormLabel>
                    <fieldset>
                        <input
                            checked={this.state.offer === true || this.state.offer === "True"}
                            id="offer"
                            onChange={this.handleInputChange}
                            type="radio" name="offer" value="True"></input>
                        <FormLabel>Yes</FormLabel>
                        <input
                            checked={this.state.offer === false || this.state.offer === "False"}
                            id="offer"
                            onChange={this.handleInputChange}
                            type="radio" name="offer" value="False"></input>
                        <FormLabel>No</FormLabel>
                    </fieldset>
                    <FormControl
                        value={this.state.review}
                        id="review"
                        placeholder="Please provide a brief review of this company (i.e. Tech Stack, Culture, etc)..."
                        onChange={this.handleInputChange}
                        as="textarea" rows="5" ></FormControl>

                    <FormControl
                        value={this.state.advice}
                        id="advice"
                        placeholder='Please provide advice for anyone interviewing with this company...'
                        onChange={this.handleInputChange}
                        as="textarea" rows="5" ></FormControl>

                </Form>
                <Button onClick={() => this.updateProfile()}>Save Changes</Button>
            </>
        )
    }
}
export default ProfileEditForm