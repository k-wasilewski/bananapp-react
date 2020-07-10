import React from 'react';
import '../../../css/App.css';
import axios from 'axios';
import AuthResultsView from './views/AuthResultsView';
import GetDays from "../../../func/GetDays";
import {connect} from "react-redux";

export class AuthResults extends React.Component {

    saveimg(score, acc, filename, username, pic_link) {
        axios.post('http://localhost:8081/auth/saveimg',
            `filename=${filename}&score=${score}&acc=${acc}
            &uname=${username}&link=${pic_link.split('+').join('plussign')}`,
            {withCredentials: true}
        ).catch(() => {console.error('Error saving img at server')});
    };


    render() {
        const img = (this.props.location.state !== undefined) ?
            this.props.location.state.img : undefined;

        const prediction = (this.props.location.state !== undefined) ?
            this.props.location.state.prediction : undefined;
        const accuracy = (this.props.location.state !== undefined) ?
            prediction.accuracy : undefined;
        const score = (this.props.location.state !== undefined) ?
            prediction.score : undefined;
        const filename = (this.props.location.state !== undefined) ?
            prediction.filename : undefined;
        const days = (score === undefined) ? undefined : GetDays(score);

        if (score === undefined || days === '[error]' || accuracy === undefined) return (
            <AuthResultsView/>
        );
        else {
            this.saveimg(score, accuracy, filename, this.props.username, img);
            return (
                <AuthResultsView img={img}
                                 days={days}
                                 accuracy={accuracy}/>
            );
        }
    }
}

function mapStateToProps(state) {
    return {
        username: state.setUsernameReducer.username,
    };
};

export default connect(mapStateToProps, null)(AuthResults);