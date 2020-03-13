import React, { Component } from "react"
import { Nav, Navbar } from "react-bootstrap"
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Navbar.css"
import {logout, isAuthenticated} from '../../modules/SimpleAuth'

class Navigation extends Component {
    render() {
        if (isAuthenticated()) {
            return (
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Navbar.Brand href="#home">Hive Mind</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                        <Link className="nav-link" to="/">Home</Link>
                        <Link className="nav-link" to="/myinterviews">My Interviews</Link>
                        <Link className="nav-link" to="/search">Search</Link>                            
                        <Link className="nav-link" to="/login" onClick={() => {
                            logout()
                            this.props.loggedOut()
                        } }>Logout</Link>                            
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