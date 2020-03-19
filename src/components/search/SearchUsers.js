// Purpose: To create the search results form component, render result cards, and execute the logic associated 

import React, { Component } from "react"
import SearchUserCard from "./SearchUserCard";
class SearchUsers extends Component {
    

   

    render() {

        return (
            <>
                {this.props.users.length === 0 && 
                    <h2>No search results</h2>
                }

                {this.props.users.map((user) => {

                    return <SearchUserCard {...this.props} key={user.id} applicant={user} />

                })
                }

            </>
        )
    }
}
export default SearchUsers