import React, {Component} from 'react';
import '../../../css/App.css';
import axios from "axios";
import AuthFailView from "./views/AuthFailView";
import AuthSuccessView from "./views/AuthSuccessView";
import AuthLogoutView from "./views/AuthLogoutView";
import { connect } from 'react-redux';
import {setUsername} from "../../../redux/actions";

class AuthSuccess extends Component {

    constructor(){
        super();
        this.state = {
            username: 0,
            redir: 0
        }
    }

    componentDidMount() {
        if (this.props.location.state!==undefined) this.props.setUsername(
            this.props.location.state.username
        );
    }

    logout = () => {
        axios.get('http://localhost:8081/logout',
            {withCredentials: true})
            .then((response) => {
                this.setState({
                    redir: 'logout'
                });
            })
    }

    render() {
        if (this.props.username===0) {
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

function mapStateToProps(state) {
    return {
        username: state.setUsernameReducer.username,
    };
};

const mapDispatchToProps = {
    setUsername
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthSuccess);