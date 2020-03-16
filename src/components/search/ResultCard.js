// Purpose: To create the search results card that will be rendered in the search results component 

import { Card } from "react-bootstrap";
import React, {Component} from 'react'
import { Button } from 'react-bootstrap'


class ResultCard extends Component {

    render() {

        return (
            <>
            <Card>
                <Card.Title>{this.props.company.name}<Button onClick={() => this.props.history.push(`/company/${this.props.company.id}`)}>View Interviews</Button></Card.Title>
            </Card>

            </>
        )
    }
}
export default ResultCard