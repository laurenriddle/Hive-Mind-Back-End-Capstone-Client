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

    searchCompanies = (terms) => {
        // gets all companies whose name matches the name in the search terms in state
        APIManager.getAllAuth(`companies?name=${terms}`)
            .then((companies) => {
                // sets the companies in state so the result cards can be made
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