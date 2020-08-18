// Purpose: To create the USERS search results list component and render result cards
import React, { Component } from "react"
import SearchUserCard from "./SearchUserCard";


class SearchUsers extends Component {

    render() {

        return (
            <>
                {this.props.users.length === 0 &&
                    <h1 className="search-results-header-no">Uh-Oh! No search results! Please try again!</h1>
                }
                {this.props.users.length > 0 &&
                    <h1 className="search-results-header-yes">Search results:</h1>
                }
                <section className="company-search-results-container">
                    {this.props.users.map((user) => {

                        return <SearchUserCard {...this.props} key={user.id} applicant={user} refreshState={this.getAllFriends} isFriendList={false}/>

                    })
                    }
                </section>
            </>
        )
    }
}
export default SearchUsers