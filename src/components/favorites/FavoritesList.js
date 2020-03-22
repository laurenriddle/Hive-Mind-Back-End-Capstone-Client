// Purpose: To create the my favorites page, render the favorites cards, and execute the logic associated 

import React, { Component } from "react"
import APIManager from '../../modules/APIManager'
import { Button, ButtonGroup, ButtonToolbar } from 'react-bootstrap'
import SearchDetailCard from "../search/SearchDetailCard"
import "./Favorites.css"
class MyFavorites extends Component {
    state = {
        interviews: [],
        companies: [],
        favorites: []
    }

    handleInputChange = (evt) => {
        let stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    // this function searches an array to make sure the object does not already exist
    pushEntry = (array, item) => {
        // if the object does not already exist in the array, push the object into the array
        if (!array.find(({ id }) => id === item.id)) {
            array.push(item);
        }
    }

    componentDidMount() {
        // gets all interviews for the specific user's favorites list
        APIManager.getAllAuth("favorites?applicant=true")
            .then((interviews) => {
                let companies = []
                interviews.forEach((interview) => {

                    // if the company is not already in the companies array, put it in there
                    this.pushEntry(companies, interview.interview.company)
                })
                // sets the interviews and companies in state
                this.setState({
                    interviews: interviews,
                    companies: companies
                })
            })

    }

    deleteFavorite = (id) => {
        // get the favorite so that you have the relationship ID
        APIManager.getAllAuth(`favorites?interview=${id}&&applicant=true`)
            .then((relationship) => {
                // make a DELETE request to the DB for the selected favorite
                APIManager.delete("favorites", relationship[0].id)
                    .then(() => {
                        // gets all favorites for the specific user
                        this.getAllFavorites()

                    })

            })

    }

    filterFavorites = (id) => {
        // gets all favorites for the company that was picked
        APIManager.getAllAuth(`favorites?applicant=true&&interview__company_id=${id}`)
            .then((interviews) => {
                // sets the favorites in state
                this.setState({
                    interviews: interviews
                })
            })
    }

    getAllFavorites = () => {
        APIManager.getAllAuth("favorites?applicant=true")
            .then((interviews) => {
                let companies = []
                interviews.forEach((interview) => {

                    // if the company is not already in the companies array, put it in there
                    this.pushEntry(companies, interview.interview.company)
                })
                // sets the interviews and companies in state
                this.setState({
                    interviews: interviews,
                    companies: companies
                })
            })
    }

    render() {

        return (
            <>
                <h1 className="my-favorites-header">My Favorites</h1>
                {this.state.companies.length === 0 &&
                    <h3 className="my-favorites-header">Uh-Oh! Looks like you don't have any favorites right now!</h3>
                }
                    <div className="filter-radio-toolbar">
                    {this.state.companies.length > 0 &&
                        <>
                            <span className="filterId"><input className="radio-buttons" type="radio" id="filterId" name="company" value="" onClick={() => this.getAllFavorites()}></input><label>All Favorites</label></span>
                            
                            {this.state.companies.map((company) => {
                                return <> <span className="filterId"><input type="radio" className="radio-buttons" name="company" value={company.id} onClick={() => this.filterFavorites(company.id)}></input><label>{company.name}</label></span>
                                </>
                            })}
                        </>
                    }
                </div>
                <section className="favorites-list-container">
                    {this.state.interviews.map((interview) => {
                        return <SearchDetailCard {...this.props} key={interview.id} interview={interview.interview} favorites={this.state.interviews} deleteFavorite={this.deleteFavorite} user={interview.interview.applicant.user} />
                    })}
                </section>
            </>
        )
    }
}
export default MyFavorites