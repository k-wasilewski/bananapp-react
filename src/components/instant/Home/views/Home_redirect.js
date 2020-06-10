import React, {Component} from "react";
import {Redirect} from 'react-router-dom';

class Home_redirect extends Component {
    render() {
        return (
            <Redirect to={{
                pathname: '/results',
                state: { prediction: this.props.prediction,
                    img: this.props.img}
            }}/>
        )
    }
}
export default Home_redirect;