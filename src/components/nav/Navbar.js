// Purpose: To create the navbar component

import React, { Component } from "react"
import { Nav, Navbar, Form, FormControl, Button } from "react-bootstrap"
import { Link } from 'react-router-dom'
import Logo from '../home/Hive_Loge.png'
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
                <>
                    <div id="NavBar">
                        <Navbar collapseOnSelect expand="lg" variant="dark" className="NavBarColor">
                            <Navbar.Brand eventKey="7" as={Link} id="logo" to="/"><img src={Logo} height="40" width="40" alt="logo"></img> Hive Mind</Navbar.Brand>
                            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                            <Navbar.Collapse id="responsive-navbar-nav">
                                <Nav className="mr-auto">
                                    <Form inline>
                                        <FormControl type="text" placeholder="First Name" className="mr-sm-2" id="firstname" onChange={this.handleInputChange} />
                                        <FormControl type="text" placeholder="Last Name" className="mr-sm-2" id="lastname" onChange={this.handleInputChange} />
                                        <Button variant="outline-primary" eventKey="6" onClick={() => this.props.searchUsers(this.state.firstname, this.state.lastname)}>Search</Button>
                                    </Form>
                                    <Nav.Link eventKey="1" as={Link} to="/myinterviews">
                                        My Interviews
                                    </Nav.Link>
                                    <Nav.Link eventKey="2" as={Link} to="/search">
                                        Search
                                    </Nav.Link>
                                    <Nav.Link eventKey="3" as={Link} to="/favorites">
                                        Favorites
                                    </Nav.Link>
                                </Nav>
                                <Nav className="ml-auto">
                                    <Nav.Link eventKey="4" as={Link} to="/profile">
                                        Profile
                                    </Nav.Link>
                                    <Nav.Link eventKey="5" as={Link} to="/login" onClick={() => {
                                        // removes the token from session storage
                                        logout()
                                        // sets the user in state in the main app file to false so the navbar wont render
                                        this.props.loggedOut()
                                    }}>
                                        Logout
                                </Nav.Link>

                                </Nav>
                            </Navbar.Collapse>
                        </Navbar>
                    </div>
                </>
            )
        } else {
            return (<></>)
        }
    }
}

export default Navigation