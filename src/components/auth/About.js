// Purpose: To create the about form and execute the logic associated 

import React, { Component } from "react"
import { register, isAuthenticated } from "../../modules/SimpleAuth"
import APIManager from "../../modules/APIManager"
import './Auth.css'
import { Button, FormControl, Form, InputGroup } from "react-bootstrap"
import { cloudName, uploadPreset } from '../../modules/Credentials';
import "../profile/Profile.css"
import Logo from "../home/Hive_Loge.png"


class About extends Component {

    state = {
        cohort: "",
        cohorts: [],
        employmentStatus: "",
        linkedInProfile: "",
        confirmpassword: "",
        aboutme: "",
        employer: "",
        location: "",
        jobtitle: "",
        image: "http://res.cloudinary.com/dkjfqmbsu/image/upload/w_200,h_200,c_thumb,g_face/v1585064058/ujymlgu6eae61jziwy9a.png"
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
            "username": this.props.location.state.user.username,
            "first_name": this.props.location.state.user.first_name,
            "last_name": this.props.location.state.user.last_name,
            "email": this.props.location.state.user.email,
            "password": this.props.location.state.user.password,
            "cohort_id": this.state.cohort,
            "is_employed": this.state.employmentStatus,
            "linkedin_profile": this.state.linkedInProfile,
            "aboutme": this.state.aboutme,
            "image": this.state.image,
            "employer": this.state.employer,
            "location": this.state.location,
            "jobtitle": this.state.jobtitle

        }

        // check to see that all fields are filled out
        if (this.state.cohort !== "" && this.state.employmentStatus !== "") {

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
            if (this.state.cohort === "") {
                alert('Please select a cohort.')
            } else if (this.state.employmentStatus === "") {
                alert('Please select an employment status.')
            }

        }
    }

    openCloudinaryWidget = () => {
        let widget = window.cloudinary.createUploadWidget({
            cloudName: cloudName,
            uploadPreset: uploadPreset
        }, (error, result) => {
            if (!error && result && result.event === "success") {
                let position = 49
                let size = "w_200,h_200,c_thumb,g_face/"
                let newimage = result.info.url
                let finalimage = newimage.substring(0, position) + size + newimage.substring(position);
                this.setState({
                    image: finalimage
                })
            }
        }
        )
        widget.open();
    }


    render() {

        return (
            <section className="about-form-container">
                <center><img src={Logo} alt="logo" className="home-logo" width="200" height="200" ></img></center>
                <h1 className="register-header">Tell us about yourself!</h1>
                <Form className="about-form" onSubmit={this.handleRegister}>
                    <InputGroup>
                        <select id="cohort"
                            onChange={this.handleInputChange}>

                            <option value="">Select a Cohort</option>
                            {this.state.cohorts.map((cohort) => {
                                return <option key={cohort.id} value={cohort.id}>{cohort.cohort}</option>
                            })}
                        </select>
                    </InputGroup>
                    <InputGroup>
                        <select id="employmentStatus"
                            onChange={this.handleInputChange}>
                            <option value="">Select Employment Status</option>
                            <option value="True">Hired</option>
                            <option value="False">Searching for Opportunities</option>
                        </select>
                    </InputGroup>

                    <FormControl
                        id="employer"
                        onChange={this.handleInputChange}
                        placeholder="If you are working somewhere, where are you employed?"

                    />
                    <FormControl
                        id="jobtitle"
                        onChange={this.handleInputChange}
                        placeholder="What is your job title?"

                    />
                    <FormControl
                        id="linkedInProfile"
                        onChange={this.handleInputChange}
                        placeholder="LinkedIn Profile"

                    />
                    <FormControl
                        id="aboutme"
                        onChange={this.handleInputChange}
                        as="textarea"
                        placeholder="Tell everyone a little bit about yourself..."

                    />
                    <FormControl
                        id="location"
                        onChange={this.handleInputChange}
                        placeholder="Tell us where your located..."

                    />

                    {this.state.image !== null &&
                        <img src={this.state.image} alt="user" className="pre-profile-img" width="75"></img>
                    }

                    <div className="upload_widget_container">
                        <Button id="upload_widget" variant="secondary" onClick={this.openCloudinaryWidget}>Choose File</Button>
                    </div>

                    <Button variant="secondary" type="submit">
                        Register
                    </Button>
                </Form>
            </section>
        )
    }
}

export default About