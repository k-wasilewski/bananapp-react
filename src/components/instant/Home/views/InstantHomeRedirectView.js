import React, {Component} from "react";
import {Redirect} from 'react-router-dom';

class InstantHomeRedirectView extends Component {
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
export default InstantHomeRedirectView;