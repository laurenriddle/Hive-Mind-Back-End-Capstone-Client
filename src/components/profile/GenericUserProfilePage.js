// Purpose: To create the profile page

import React, { Component } from "react"
import APIManager from '../../modules/APIManager'
import { Jumbotron } from 'react-bootstrap'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Profile.css'
import SearchDetailCard from "../search/SearchDetailCard";

class GenericProfile extends Component {
    state = {
        applicant: {},
        user: {},
        cohort: {},
        interviews: [],
        favorites: [],
        loggedInUserId: null,
        isFriend: false
    }

    componentDidMount() {
        // gets the applicant's information
        APIManager.getAllAuth(`applicants/${this.props.match.params.profileId}`)
            .then((applicant) => {
                // sets the applicant in state so it can be displayed on the profile page
                this.setState({
                    applicant: applicant,
                    user: applicant.user,
                    cohort: applicant.cohort
                })
            })
        APIManager.getAllAuth(`interviews?review=${this.props.match.params.profileId}`)
            .then((interviews) => {
                // sets the applicant in state so it can be displayed on the profile page
                this.setState({
                    interviews: interviews
                })
            })
        // get all favorites relationships and set them in state so that the cards will render the correct buttons
        APIManager.getAllAuth("favorites?applicant=true")
            .then((favorites) => {
                // set favorites in state
                this.setState({
                    favorites: favorites
                })
            })
        //  gets current logged in user
        APIManager.getAllAuth("applicants?applicant=true")
            .then((applicant) => {
                // sets the applicant in state so it can be displayed on the profile page
                this.setState({
                    loggedInUserId: applicant[0].user.id,
                })
            })
        // gets all of the user's friends
        APIManager.getAllAuth("friends?applicant=true")
        .then((friends) => {
            friends.forEach((friend) => {
                // checks to see if this user profile is a friend
                if(this.state.user.id === friend.friend.user.id) {
                    // sets the friends in state so it can be displayed on the profile page
                    this.setState({
                        isFriend: true
                    })
            }
            })
                
            })
    }

    deleteFavorite = (id) => {
        // get the favorite to that you have the relationship ID
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

    addFavorite = (id) => {
        let favorite = {
            interview_id: id
        }
        // add the favorite to the user's list
        APIManager.post(`favorites`, favorite)
            .then(() => {
                // gets all favorites for the specific user
                this.getAllFavorites()
            })
    }

    getAllFavorites = () => {
        // get all favorites relationships and set them in state so that the cards will render the correct buttons
        APIManager.getAllAuth("favorites?applicant=true")
            .then((favorites) => {
                // set favorites in state
                this.setState({
                    favorites: favorites
                })
            })
    }

    deleteInterview = (id) => {
        // confirm the user wants to delete the interview
        if (window.confirm("Are you sure you want to delete this interview?")) {
            // make a DELETE request to the DB for the selected interview
            APIManager.delete("interviews", id)
                .then(() => {
                    // get all interviews for this particular company again
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

      deleteFriend = (id) => {
        // get the friend so that you have the relationship ID
        APIManager.getAllAuth(`friends?friend=${id}&&applicant=true`)
            .then((relationship) => {
                // make a DELETE request to the DB for the selected friend
                APIManager.delete("friends", relationship[0].id)
                    .then(() => {
                        // gets all friends for the specific user
                    this.setState({
                        isFriend: false
                    })

                    })

            })
    }

     addNewFriend = (friendId) => {
        //  adds a new friend relationship
        const newfriend = {
            friend_id: friendId
        }

        APIManager.post("friends", newfriend)
        .then(() => {
            this.setState({
                isFriend: true
            })
            
        })
    }

    render() {

        return (
            <>
                <Jumbotron className="user-jumbo">
                    <h1 className="righteous">{this.state.user.first_name} {this.state.user.last_name}</h1>
                    <h5>@{this.state.user.username}</h5>

                    <h5>{this.state.applicant.jobtitle}
                        {this.state.applicant.employer !== null && this.state.applicant.employer !== "" ?
                            <> at {this.state.applicant.employer}</>
                            :
                            <></>
                        }
                    </h5>
                    
                        {this.state.isFriend && this.state.user.id !== this.state.loggedInUserId
                        ?
                            <h5 onClick={() => { this.deleteFriend(this.state.user.id) }}>Unfollow</h5>
                            :
                            <></>
                        }
                    
                        {!this.state.isFriend && this.state.user.id !== this.state.loggedInUserId
                        ?
                        
                            <h5 onClick={() => { this.addNewFriend(this.state.user.id) }}> + Follow </h5>
                            :
                            <></>
                        }
                
                    
                    
                </Jumbotron>
                {this.state.applicant.image !== null ?
                    <img src={this.state.applicant.image} alt="user" className="profile-image"></img>
                    :
                    <FontAwesomeIcon icon={faUser} className="profile-image" />
                }

                <section className="about">
                    <h3 className="righteous">About</h3><hr className="hr" />
                    <h6>{this.state.cohort.cohort}</h6>
                    <h5>Location: {this.state.applicant.location}</h5>
                    <p> {this.state.applicant.aboutme}</p>
                    {/* {this.state.user.id === this.state.loggedInUserId &&
                        <Button onClick={() => this.props.history.push('/profile/edit')}>Edit</Button>
                    } */}
                    <h3 className="righteous">Contact</h3><hr className="hr" />
                    <h6>{this.state.user.email}</h6>
                    <a href={this.state.applicant.linkedin_profile} target="_blank" rel="noopener noreferrer" className="linkedin">View LinkedIn Profile</a>
                </section>
                <section className="interview-cards-container">
                    {this.state.interviews.map((interview) => {
                        return <SearchDetailCard favorites={this.state.favorites} {...this.props} key={interview.id} interview={interview} user={interview.applicant.user} deleteInterview={this.deleteInterview} deleteFavorite={this.deleteFavorite} addFavorite={this.addFavorite} />

                    })}
                </section>
            </>
        )
    }
}
export default GenericProfile