import React, { Component } from "react"
import { Nav, Navbar } from "react-bootstrap"
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Navbar.css"

class Navigation extends Component {
    render() {
        if (this.props.user === true) {
            return (
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Navbar.Brand href="#home">Hive Mind</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                        <Link className="nav-link link" to="/">Home</Link>
                        <Link className="nav-link link" to="/myinterviews">My Interviews</Link>
                        <Link className="nav-link link" to="/search">Search</Link>                            
                        <Link className="nav-link link" to="/login">Logout</Link>                            
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