// Purpose: To create the search results card that will be rendered in the search results component 

import { Card } from "react-bootstrap";
import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import "./Search.css"
class ResultCard extends Component {

    render() {

        return (
            <>
            <Card className="company-results-card">
                 <Link className="view-interviews-link" to={`/company/${this.props.company.id}`}>{this.props.company.name} ({this.props.company.industry.industry})</Link>
            </Card>

            </>
        )
    }
}
export default ResultCard