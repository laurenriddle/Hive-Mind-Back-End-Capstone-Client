// Purpose: To create the interview edit form and execute the logic associated 

import React, { Component } from "react"
import APIManager from '../../modules/APIManager'
import { Button, FormControl, FormLabel, Form } from 'react-bootstrap'
import { cloudName, uploadPreset } from '../../modules/Credentials';
import "./Profile.css"

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
        image: null,
        aboutme: "",
        jobtitle: "",
        location: "",
        cohorts: []
    }

    handleInputChange = (evt) => {
        let stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    componentDidMount() {
        // gets applicants information to populate the form
        APIManager.getAllAuth("applicants?applicant=true")
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
                    image: applicant[0].image,
                    aboutme: applicant[0].aboutme,
                    jobtitle: applicant[0].jobtitle,
                    location: applicant[0].location,
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
        // defines the applicant object that will be submitted to the DB
        const applicant = {
            linkedin_profile: this.state.linkedin_profile,
            employer: this.state.employer,
            is_employed: this.state.is_employed,
            email: this.state.email,
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            username: this.state.username,
            cohort_id: this.state.cohort_id,
            image: this.state.image,
            aboutme: this.state.aboutme,
            jobtitle:  this.state.jobtitle,
            location:  this.state.location,
        }

        // checks to see if the user filled out the entire form
        if (this.state.first_name !== "" && this.state.last_name !== "" && this.state.email !== "" && this.state.username !== "") {
            // makes a put to the applicants table
            APIManager.update_profile("applicants", applicant)
                .then(() => {
                    // pushes the user to their my profile page
                    this.props.history.push("/profile")
                })
        } else {
            // tiggers alerts if the user has not filled out a required field in the form
            if (this.state.first_name === "") {
                alert('Please enter a first name.')
            } else if (this.state.last_name === "") {
                alert('Please enter a last name.')
            } else if (this.state.username === "") {
                alert('Please enter a username.')
            } else if (this.state.email === "") {
                alert('Please enter an email.')
            }
        }
    }

    openCloudinaryWidget = () => {
        let widget = window.cloudinary.createUploadWidget({
            cloudName: cloudName,
            uploadPreset: uploadPreset
        }, (error, result) => {
            if (!error && result && result.event === "success") {
                this.setState({
                    image: result.info.url
                })
            }
        }
        )
        widget.open();
    }


    render() {

        return (
            <>
                <Form>
                    <FormControl
                        value={this.state.first_name}
                        id="first_name"
                        placeholder="First Name"
                        required
                        onChange={this.handleInputChange}
                        type="text"></FormControl>

                    <FormControl
                        value={this.state.last_name}
                        id="last_name"
                        placeholder="Last Name"
                        required
                        onChange={this.handleInputChange}
                        type="text"></FormControl>

                    <FormControl
                        value={this.state.username}
                        id="username"
                        placeholder="Username"
                        required
                        onChange={this.handleInputChange}
                        type="text"></FormControl>

                    <FormControl
                        value={this.state.email}
                        id="email"
                        placeholder="Email"
                        required
                        onChange={this.handleInputChange}
                        type="text"></FormControl>

                    <FormControl
                        value={this.state.aboutme}
                        id="aboutme"
                        placeholder="Tell everyone a little bit about yourself..."
                        onChange={this.handleInputChange}
                        type="text"></FormControl>
                    <FormControl
                        value={this.state.location}
                        id="location"
                        placeholder="Location"
                        onChange={this.handleInputChange}
                        type="text"></FormControl>

                    <FormControl
                        value={this.state.linkedin_profile}
                        id="linkedin_profile"
                        placeholder="LinkedIn Profile"
                        onChange={this.handleInputChange}
                        type="text"></FormControl>

                    <select
                        onChange={this.handleInputChange} value={this.state.cohort_id}
                        id="cohort_id">
                        <option key="0" value="">Select Cohort</option>
                        {this.state.cohorts.map((cohort) => {
                            return <option key={cohort.id} value={cohort.id}>{cohort.cohort}</option>
                        })}

                    </select>


                    <FormLabel>Are you currently working somewhere?</FormLabel>
                    <fieldset>
                        <input
                            checked={this.state.is_employed === true || this.state.is_employed === "True"}
                            id="is_employed"
                            onChange={this.handleInputChange}
                            type="radio" name="is_employed" value="True"></input>
                        <FormLabel>Yes</FormLabel>
                        <input
                            checked={this.state.is_employed === false || this.state.is_employed === "False"}
                            id="is_employed"
                            onChange={this.handleInputChange}
                            type="radio" name="is_employed" value="False"></input>
                        <FormLabel>No</FormLabel>
                    </fieldset>
                    <FormControl
                        value={this.state.employer}
                        id="employer"
                        placeholder="If you are employed, where are you working?"
                        onChange={this.handleInputChange}
                        type="text"></FormControl>
                    <FormControl
                        value={this.state.jobtitle}
                        id="jobtitle"
                        placeholder="If you are employed, what is you job title?"
                        onChange={this.handleInputChange}
                        type="text"></FormControl>

                </Form>
                {this.state.image !== null && 
                    <img src={this.state.image} alt="user" className="pre-profile-img"></img>
                }
                <div className="upload_widget_container">
                    <Button type="button" id="upload_widget" className="cloudinary-button" onClick={this.openCloudinaryWidget}>Choose File</Button>
                </div>
                <Button onClick={() => this.updateProfile()}>Save Changes</Button>
            </>
        )
    }
}
export default ProfileEditForm