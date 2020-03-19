// Purpose: To create the search results card that will be rendered in the user search results component 

import { Card } from "react-bootstrap";
import React, {Component} from 'react'
import { Link } from "react-router-dom";


class SearchUserCard extends Component {

    render() {

        return (
            <>
            <Card>
                <Card.Title><img src={this.props.applicant.image} alt="profile" width="100" height="100"></img><Link to={`/profile/${this.props.applicant.id}`}>{this.props.applicant.user.first_name} {this.props.applicant.user.last_name}</Link></Card.Title>
            </Card>

            </>
        )
    }
}
export default SearchUserCard