// Purpose: To create the COMPANIES search results form component, render result cards, and execute the logic associated 

import React, { Component } from "react"
import APIManager from '../../modules/APIManager'
import { Button, FormControl } from 'react-bootstrap'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ResultCard from './ResultCard'
import "./Search.css"
class SearchResults extends Component {
    state = {
        companies: [],
        searchterms: "",
        searched: false
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
                // checks to make sure that the suer has actually entered search terms
                if (this.state.searchterms !== "") {
                    // sets the companies in state so the result cards with the company names can be made
                    this.setState({
                        companies: companies,
                        // this boolean tells the render that the list of companies has been searched so that it can either display the results or a "no search results" header
                        searched: true
                    })
                } else {
                    // if the user selected the search button, but did not enter search terms, render the no search results found header
                    this.setState({
                        // this boolean tells the render that the list of companies has been searched so that it can either display the results or a "no search results" header
                        searched: true,
                        companies: [],
                    })
                }
            })

    }

    render() {

        return (
            <>
                <section className="company-search-input-container">
                    <FormControl
                        id="searchterms"
                        onChange={this.handleInputChange}
                        type="text"
                        placeholder="Enter company name to search..."></FormControl>
                    <Button onClick={() => this.searchCompanies(this.state.searchterms)} className="search-companies-button" variant="secondary"><FontAwesomeIcon icon={faSearch} /></Button>
                </section>
                <section className="company-search-results-container">
                    {
                        this.state.companies.length === 0 && this.state.searched === true &&
                        <h2 className="my-favorites-header">No search results ... Please try again!</h2>
                    }

                    {
                        this.state.companies.map((company) => {

                            return <ResultCard {...this.props} key={company.id} company={company} />

                        })
                    }
                </section>

            </>
        )
    }
}
export default SearchResults