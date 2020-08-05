// Purpose: To create the search results card that will be rendered in the user search results component 

import { Card, Button } from "react-bootstrap";
import React, {Component} from 'react'
import { Link } from "react-router-dom";
import APIManager from '../../modules/APIManager'

class SearchUserCard extends Component {
    state = {
        isFriend: false,
        friends: []
        
    }

    componentDidMount() {
        APIManager.getAllAuth("friends?applicant=True")
        .then((friends) => {
            console.log(this.props.applicant.id , "FRIENDS")

            friends.forEach((friend) => {
            console.log(friend, "FRIENDS")

                if(this.props.applicant.id === friend.friend.user.id)
                {
                    this.setState({
                        isFriend: true
                    })
                }
            })
        })
    }

    render() {
        return (
            <>
            <Card className="company-results-card">
                <Card.Title><img src={this.props.applicant.image} alt="profile" width="50" height="50" className="card-image"></img>  <Link className="view-interviews-link"  to={`/profile/${this.props.applicant.id}`}>{this.props.applicant.user.first_name} {this.props.applicant.user.last_name}</Link></Card.Title>
                {this.state.isFriend ? <Button onClick={() => this.props.deleteFriend(this.props.applicant.id)}>Unfollow</Button> : <Button onClick={() => this.props.addNewFriend(this.props.applicant.id)} >Follow</Button>}
            </Card>

            </>
        )
    }
}
export default SearchUserCard;