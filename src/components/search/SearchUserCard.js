// Purpose: To create the search results card that will be rendered in the user search results component 

import { Card } from "react-bootstrap";
import React, {Component} from 'react'
import { Link } from "react-router-dom";


class SearchUserCard extends Component {

    render() {

        return (
            <>
            <Card className="company-results-card">
                <Card.Title><img src={this.props.applicant.image} alt="profile" width="50" height="50"></img>  <Link className="view-interviews-link"  to={`/profile/${this.props.applicant.id}`}>{this.props.applicant.user.first_name} {this.props.applicant.user.last_name} {this.props.applicant.location}</Link></Card.Title>
            </Card>

            </>
        )
    }
}
export default SearchUserCard