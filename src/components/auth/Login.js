import React, { Component } from "react"
import "./Auth.css"
import { login, isAuthenticated } from "../../modules/SimpleAuth"


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

    // Simplistic handler for login submit
    handleLogin = (evt) => {
        evt.preventDefault()

        const credentials = {
            "username": this.state.username,
            "password": this.state.password
        }

        login(credentials)
            .then(() => {
                if (isAuthenticated()) {
                    this.props.loggedIn()
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
                    onChange={this.handleInputChange}

                />


                <input
                    id="password"
                    label="Password"
                    className="login-input"
                    onChange={this.handleInputChange}
                    type="password"
                />

                <button type="submit">
                    Sign in
              </button>
            </form>
            </section>
        )
    }
}

export default Login