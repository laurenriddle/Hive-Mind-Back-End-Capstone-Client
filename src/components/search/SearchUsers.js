// Purpose: To create the search results list component and render result cards
import React, { Component } from "react"
import SearchUserCard from "./SearchUserCard";
class SearchUsers extends Component {




    render() {

        return (
            <>
                {this.props.users.length === 0 &&
                    <h2>No search results</h2>
                }
                <section className="company-search-results-container">
                    {this.props.users.map((user) => {

                        return <SearchUserCard {...this.props} key={user.id} applicant={user} />

                    })
                    }
                </section>
            </>
        )
    }
}
export default SearchUsers