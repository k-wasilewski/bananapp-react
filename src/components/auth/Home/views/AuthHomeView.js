import React, {Component} from 'react';
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";

class AuthHomeView extends Component {
    render() {
        if (this.props.prediction!==undefined && this.props.img!==undefined)
            return (<Redirect to={{
                pathname: '/auth/results',
                state: { prediction: this.props.prediction,
                    img: this.props.img}
            }}/>)
        else
            return (
            <div>
                <header>
                    <input type='file' name='avatar' onChange={this.props.fileChangedHandler} />
                    <button type='button' onClick={this.props.submitLoading} > Upload </button>
                    { this.props.loadingComponent }
                    { this.props.errorMsg }
                    { this.props.$imagePreview }
                </header>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        username: state.setUsernameReducer.username,
    };
};

export default connect(mapStateToProps, null)(AuthHomeView);