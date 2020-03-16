// Purpose: To create the login form and execute the logic associated 

import React, { Component } from "react"
import {Link} from 'react-router-dom'
import "./Auth.css"
import { login, isAuthenticated } from "../../modules/SimpleAuth"
import {Button} from 'react-bootstrap'

class Login extends Component {

    state = {
        username: "",
        password: ""
    }

    handleInputChange = (evt) => {
        let stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    // handles the login process
    handleLogin = (evt) => {
        evt.preventDefault()
        // define object to send to DB
        const credentials = {
            "username": this.state.username,
            "password": this.state.password
        }
        // calls login function from simple auth in modules folder
        login(credentials)
            .then(() => {
                // checks to see if the user is authenticated
                if (isAuthenticated()) {

                    // This function sets the user to true in the main app file so that the navbar will render correctly.
                    this.props.loggedIn()

                    // push the user to home
                    this.props.history.push("/")
                }
            })
    }


    render() {

        return (
            <section className="login-page-container">
            <form className="login-form" onSubmit={this.handleLogin}>
                <h1 className="login-header">Hive Mind</h1>
                <input
                    id="username"
                    className="login-input"
                    label="Username"
                    placeholder="Username"
                    onChange={this.handleInputChange}

                />


                <input
                    id="password"
                    label="Password"
                    className="login-input"
                    placeholder="Password"
                    onChange={this.handleInputChange}
                    type="password"
                />

                <Button type="submit">
                    Sign in
              </Button>
              <Link to="/register">Not a member? Click here to sign up!</Link>
            </form>
            </section>
        )
    }
}

export default Login