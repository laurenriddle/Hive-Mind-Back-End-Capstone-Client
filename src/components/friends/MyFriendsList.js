// Purpose: To create the my friends page, render the friends cards, and execute the logic associated 

import React, { Component } from "react"
import APIManager from '../../modules/APIManager'
import SearchUserCard from "../search/SearchUserCard"
class MyFriends extends Component {
    state = {
        friends: []
    }

    componentDidMount() {
       // gets all friends for the specific user's friends list
        APIManager.getAllAuth("friends?applicant=true")
            .then((friends) => {
                // sets the friends in state
                this.setState({
                    friends: friends                })
            })

    }

    deleteFriend = (id) => {
        // get the friend so that you have the relationship ID
        APIManager.getAllAuth(`friends?friend=${id}&&applicant=true`)
            .then((relationship) => {
                // make a DELETE request to the DB for the selected friend
                APIManager.delete("friends", relationship[0].id)
                    .then(() => {
                        // gets all friends for the specific user
                        this.getAllFriends()

                    })

            })

    }

    getAllFriends = () => {
        // gets all friends for the specific user's friends list
        APIManager.getAllAuth("friends?applicant=true")
            .then((friends) => {
                // sets the friends in state
                this.setState({
                    friends: friends                })
            })
    }

    render() {

        return (
            <>
                <h1 className="my-favorites-header">My Friends</h1>
                {this.state.friends.length === 0 &&
                    <h3 className="my-favorites-header">Uh-Oh! Looks like you aren't following anyone right now!</h3>
                }

                <section className="favorites-list-container">
                    {this.state.friends.map((friend) => {
                        return <SearchUserCard {...this.props} key={friend.id} applicant={friend.friend} friend={true} deleteFriend={this.deleteFriend} isFriendList={true}/>
                    })}
                </section>
            </>
        )
    }
}
export default MyFriends;