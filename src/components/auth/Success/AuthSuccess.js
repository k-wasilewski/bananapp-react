import React, {Component} from 'react';
import '../../../css/App.css';
import axios from "axios";
import AuthFailView from "./views/AuthFailView";
import AuthSuccessView from "./views/AuthSuccessView";
import AuthLogoutView from "./views/AuthLogoutView";

class AuthSuccess extends Component {

    constructor(){
        super();
        this.state = {
            username: 0,
            redir: 0
        }
    }

    componentDidMount() {
        axios.get('http://localhost:8081/auth/username')
            .then((response) => {
                let uname = response.data;
                this.setState({
                    username: uname
                });
            })
    }

    logout = () => {
        axios.get('http://localhost:8081/logout')
            .then((response) => {
                this.setState({
                    redir: 'logout'
                });
            })
    }

    render() {
        if (this.state.username===0) {
            return (
                <AuthFailView/>
            )
        } else if (this.state.redir===0) {
            return (
                <AuthSuccessView username={this.state.username}
                                 logout={this.logout}/>
            );
        } else if (this.state.redir=='logout') {
            return (
                <AuthLogoutView/>
            )
        }
    }
}
export default AuthSuccess;