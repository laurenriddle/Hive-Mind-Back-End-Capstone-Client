// Purpose: To create the navbar component

import React, { Component } from "react"
import { Nav, Navbar, Form, FormControl, Button } from "react-bootstrap"
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Navbar.css"
import { logout, isAuthenticated } from '../../modules/SimpleAuth'

class Navigation extends Component {
    state = {
        firstname: "",
        lastname: ""
    }

    handleInputChange = (evt) => {
        let stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    render() {
        if (isAuthenticated()) {
            return (
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Navbar.Brand><Link className="logo" to="/">Hive Mind</Link></Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">

                            <Link className="nav-link" to="/myinterviews">My Interviews</Link>
                            <Link className="nav-link" to="/search">Search</Link>
                            <Link className="nav-link" to="/favorites">Favorites</Link>
                            <Form inline>
                                <FormControl type="text" placeholder="First Name" className="mr-sm-2" id="firstname" onChange={this.handleInputChange} />
                                <FormControl type="text" placeholder="Last Name" className="mr-sm-2" id="lastname" onChange={this.handleInputChange} />
                                <Button variant="outline-primary" onClick={() => this.props.searchUsers(this.state.firstname, this.state.lastname)}>Search</Button>
                            </Form>
                        </Nav>
                        <Nav className="ml-auto">
                            <Link className="nav-link" to={`/profile`}>Profile</Link>
                            <Link className="nav-link" to="/login" onClick={() => {
                                // removes the token from session storage
                                logout()
                                // sets the user in state in the main app file to false so the navbar wont render
                                this.props.loggedOut()
                            }}>Logout</Link>

                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            )
        } else {
            return (<></>)
        }
    }
}

export default Navigation