// Purpose: To create the register form and execute the logic associated 

import React, { Component } from "react"
import { Link } from "react-router-dom"
import { register, isAuthenticated } from "../../modules/SimpleAuth"
import APIManager from "../../modules/APIManager"
import './Auth.css'
import { Button } from "react-bootstrap"
import { cloudName, uploadPreset } from '../../modules/Credentials';
import "../profile/Profile.css"

class Register extends Component {

    state = {
        email: "",
        userName: "",
        lastName: "",
        password: "",
        firstName: "",
        cohort: "",
        cohorts: [],
        employmentStatus: "",
        linkedInProfile: "",
        confirmpassword: "",
        aboutme: "",
        employer: "",
        image: null
    }

    handleInputChange = (evt) => {
        let stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    componentDidMount() {
        // get all cohorts to populate the dropdown
        APIManager.getAllNotAuth("cohorts")
            .then((cohorts) => this.setState({ cohorts: cohorts }))
    }
    handleRegister = event => {
        event.preventDefault()

        // Create object with values from state
        const newUser = {
            "username": this.state.userName,
            "first_name": this.state.firstName,
            "last_name": this.state.lastName,
            "email": this.state.email,
            "password": this.state.password,
            "cohort_id": this.state.cohort,
            "is_employed": this.state.employmentStatus,
            "linkedin_profile": this.state.linkedInProfile,
            "aboutme": this.state.aboutme,
            "image": this.state.image,
            "employer": this.state.employer

        }

        // check to see that all fields are filled out
        if (this.state.password === this.state.confirmpassword && this.state.userName !== "" && this.state.firstName !== "" && this.state.lastName !== "" && this.state.email !== "" && this.state.password !== "" && this.state.confirmpassword !== "" && this.state.cohort !== "" && this.state.employmentStatus !== "") {

            // Make a fetch call with the object as the body of the POST request
            register(newUser)
                .then(() => {
                    // checks to make sure the user is authenticated
                    if (isAuthenticated()) {
                        // this function sets the user value in state in hivemind.js to true so that the navbar will render
                        this.props.loggedIn()
                        // push to the home page
                        this.props.history.push("/")
                    }
                })
        } else {
            // these alerts will be triggered if a field is not filled out or the passwords do not match 
            if (this.state.userName === "") {
                alert('Please provide a username.')
            } else if (this.state.firstName === "") {
                alert('Please provide a first name.')
            } else if (this.state.lastName === "") {
                alert('Please provide a last name.')
            } else if (this.state.email === "") {
                alert('Please provide an email address.')
            } else if (this.state.cohort === "") {
                alert('Please select a cohort.')
            } else if (this.state.employmentStatus === "") {
                alert('Please select an employment status.')
            } else if (this.state.password === "") {
                alert('Please provide a password.')
            } else if (this.state.confirmpassword === "") {
                alert('Please confirm your password.')
            } else if (this.state.password !== this.state.confirmpassword) {
                alert('Passwords do not match. Please try again.')
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
            <section className="register-form-container">
                <form className="register-form" onSubmit={this.handleRegister}>
                    <h1 className="register-header">Register for Hive Mind!</h1>
                    <input
                        id="userName"
                        onChange={this.handleInputChange}
                        placeholder="Username"
                    />



                    <input
                        id="firstName"
                        onChange={this.handleInputChange}
                        placeholder="First Name"

                    />


                    <input
                        id="lastName"
                        onChange={this.handleInputChange}
                        placeholder="Last Name"

                    />

                    <input
                        id="email"
                        onChange={this.handleInputChange}
                        placeholder="Email"

                    />
                    <select id="cohort"
                        onChange={this.handleInputChange}>

                        <option value="">Select a Cohort</option>
                        {this.state.cohorts.map((cohort) => {
                            return <option key={cohort.id} value={cohort.id}>{cohort.cohort}</option>
                        })}
                    </select>

                    <select id="employmentStatus"
                        onChange={this.handleInputChange}>
                        <option value="">Select Employment Status</option>
                        <option value="True">Hired</option>
                        <option value="False">Searching for Opportunities</option>
                    </select>

                    <input
                        id="employer"
                        onChange={this.handleInputChange}
                        placeholder="If you are working somewhere, where are you employed?"

                    />
                    <input
                        id="linkedInProfile"
                        onChange={this.handleInputChange}
                        placeholder="LinkedIn Profile"

                    />
                    <input
                        id="aboutme"
                        onChange={this.handleInputChange}
                        placeholder="Tell everyone a little bit about yourself..."

                    />

                    <input
                        id="password"
                        onChange={this.handleInputChange}
                        type="password"
                        placeholder="Password"

                    />

                    <input
                        id="confirmpassword"
                        onChange={this.handleInputChange}
                        type="password"
                        placeholder="Confirmation Password"

                    />

                    {this.state.image !== null &&
                        <img src={this.state.image} alt="user" className="pre-profile-img"></img>
                    }

                    <div className="upload_widget_container">
                        <Button type="button" id="upload_widget" className="cloudinary-button" onClick={this.openCloudinaryWidget}>Choose File</Button>
                    </div>

                    <Button type="submit">
                        Register
                    </Button>
                </form>
                <Link to="/login">Already have an account? Click here to sign in!</Link>
            </section>
        )
    }
}

export default Register