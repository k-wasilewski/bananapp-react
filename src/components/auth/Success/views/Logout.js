import {Redirect} from "react-router-dom";
import React, {Component} from "react";

class Logout extends Component {
    render() {
        return (
            <Redirect to={{
                pathname: '/',
                state: { logout: true }
            }}/>
        )
    }
}
export default Logout;
