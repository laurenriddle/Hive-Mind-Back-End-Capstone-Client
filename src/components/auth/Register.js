// Purpose: To create the register form and execute the logic associated 

import React, { Component } from "react"
import { Link } from "react-router-dom"
import './Auth.css'
import { Button, FormControl, Form } from "react-bootstrap"
import "../profile/Profile.css"
import Logo from "../home/Hive_Loge.png"


class Register extends Component {

    state = {
        email: "",
        userName: "",
        lastName: "",
        password: "",
        firstName: ""
    }

    handleInputChange = (evt) => {
        let stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    pushToAbout = event => {
        event.preventDefault()

        // Create object with values from state
        const newUser = {
            "username": this.state.userName,
            "first_name": this.state.firstName,
            "last_name": this.state.lastName,
            "email": this.state.email,
            "password": this.state.password
        }

        // check to see that all fields are filled out
        if (this.state.password === this.state.confirmpassword && this.state.userName !== "" && this.state.firstName !== "" && this.state.lastName !== "" && this.state.email !== "" && this.state.password !== "" && this.state.confirmpassword !== "") {

            // Make a fetch call with the object as the body of the POST request
            this.props.history.push({
                pathname: "/about",
                state: { user: newUser }
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
            } else if (this.state.password === "") {
                alert('Please provide a password.')
            } else if (this.state.confirmpassword === "") {
                alert('Please confirm your password.')
            } else if (this.state.password !== this.state.confirmpassword) {
                alert('Passwords do not match. Please try again.')
            }

        }
    }


    render() {

        return (
            <>
                <section className="register-form-container">
                    <center><img src={Logo} alt="logo" className="home-logo" width="200" height="200" ></img></center>
                    <h1 className="register-header">Register for Hive Mind!</h1>
                    <Form className="register-form" onSubmit={this.pushToAbout}>
                        <FormControl
                            id="userName"
                            onChange={this.handleInputChange}
                            placeholder="Username"
                        />


                        <FormControl
                            id="firstName"
                            onChange={this.handleInputChange}
                            placeholder="First Name"

                        />


                        <FormControl
                            id="lastName"
                            onChange={this.handleInputChange}
                            placeholder="Last Name"

                        />

                        <FormControl
                            id="email"
                            onChange={this.handleInputChange}
                            placeholder="Email"

                        />

                        <FormControl
                            id="password"
                            onChange={this.handleInputChange}
                            type="password"
                            placeholder="Password"

                        />

                        <FormControl
                            id="confirmpassword"
                            onChange={this.handleInputChange}
                            type="password"
                            placeholder="Confirmation Password"

                        />


                        <Button variant="secondary" type="submit">Next</Button>
                        <section>
                    <Link  clasName="register-link" to="/login">Already have an account? Click here to sign in!</Link></section>
                    </Form>
                </section>
            </>
        )
    }
}

export default Register;