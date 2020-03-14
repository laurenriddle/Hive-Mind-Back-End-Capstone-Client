import React, { Component } from "react"
import APIManager from '../../modules/APIManager'
import { Button, FormControl } from 'react-bootstrap'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ResultCard from './ResultCard'
class SearchResults extends Component {
    state = {
        companies: [],
        searchterms: ""
    }

    handleInputChange = (evt) => {
        let stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    componentDidMount() {
        // // gets all interviews for the specific user
        // APIManager.getAllAuth("companies")
        //     .then((companies) => {
        //         // sets the interviews in state
        //         this.setState({
        //             companies: companies
        //         })
        //     })
    }

    searchCompanies = (terms) => {
        APIManager.getAllAuth(`companies?name=${terms}`)
            .then((companies) => {
                this.setState({
                    companies: companies
                })
            })
    }

    render() {

        return (
            <>
                <FormControl
                    id="searchterms"
                    onChange={this.handleInputChange}
                    type="text"
                    placeholder="Enter company name to search..."></FormControl>
                <Button onClick={() => this.searchCompanies(this.state.searchterms)}><FontAwesomeIcon icon={faSearch} /></Button>
                {this.state.companies.map((company) => {
                    return <ResultCard {...this.props} key={company.id} company={company} />
                })}

            </>
        )
    }
}
export default SearchResults