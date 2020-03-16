import React, { Component } from "react"
import APIManager from '../../modules/APIManager'
import { Jumbotron, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import SearchDetailCard from './SearchDetailCard'
class CompanyDetail extends Component {
    state = {
        company: {},
        industry: {},
        interviews: []
    }

    handleInputChange = (evt) => {
        let stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    
    componentDidMount () {
        // gets the single company so we can populate the jumbotron
        APIManager.getOne("companies", this.props.match.params.companyId)
        .then((company) => {
            // sets the company and its industry in state
            this.setState({
                company: company,
                industry: company.industry
            })
        })
        // gets all of the interviews for the company
        APIManager.getAllAuth(`interviews?company=${this.props.match.params.companyId}`)
        .then((interviews) => {
            this.setState({
                // sets the interviews in state so that they can be used to load the interview cards
                interviews: interviews,
            })
        })
    }
    deleteInterview = (id) => {
        // confirm the user wants to delete the interview
        if (window.confirm("Are you sure you want to delete this interview?")) {
            // make a DELETE request to the DB for the selected interview
            APIManager.delete("interviews", id)
                .then(() => {
                    // get all interviews again
                    APIManager.getAllAuth(`interviews?company=${this.props.match.params.companyId}`)
                        .then((interviews) => {
                            // update state with interviews
                            this.setState({
                                interviews: interviews
                            })
                        })

                })
        }
    }
    

    render() {

        return (
            <>
          <Jumbotron>
              <h1>{this.state.company.name}</h1>
              <p>{this.state.industry.industry}</p>
          </Jumbotron>
          <Link to="/interview/new"><Button>New Survey</Button></Link>
                {this.state.interviews.map((interview) => {
                    return <SearchDetailCard {...this.props} key={interview.id} interview={interview} user={interview.applicant.user} deleteInterview={this.deleteInterview} />
                })}
                {this.state.interviews.length === 0 &&
                <>
                <h4>It looks like there are no interviews for this company yet. Would you like to add one?</h4>
                </>
            }

            </>
        )
    }
}
export default CompanyDetail