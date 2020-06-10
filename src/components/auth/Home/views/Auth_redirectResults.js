import React, {Component} from "react";
import {Redirect} from "react-router-dom";

class Auth_redirectResults extends Component {
    render() {
        return (
            <Redirect to={{
                pathname: '/auth/results',
                state: { prediction: this.props.prediction,
                    img: this.props.img,
                    username: this.props.username}
            }}/>
        )
    }
}
export default Auth_redirectResults;