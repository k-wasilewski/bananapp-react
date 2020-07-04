import React from 'react';
import '../../../css/App.css';
import axios from 'axios';
import AuthErrorView from './views/AuthErrorView';
import AuthResultsView from './views/AuthResultsView';
import GetDays from "../../../func/GetDays";

class AuthResults extends React.Component {

    saveimg = (score, acc, filename, username, pic_link) => {
        axios.post('http://localhost:8081/auth/saveimg',
            `filename=${filename}&score=${score}&acc=${acc}
            &uname=${username}&link=${pic_link.split('+').join('plussign')}`,
            {withCredentials: true}
        )};


    render() {
        let img;
        if (this.props.location.state!==undefined)
            img = this.props.location.state.img;

        let prediction;
        if (this.props.location.state!==undefined)
            prediction = this.props.location.state.prediction;

        let username;
        let accuracy;
        let score;
        let filename;
        if (this.props.location.state!==undefined) {
            prediction = this.props.location.state.prediction;
            accuracy = prediction.accuracy;
            score = prediction.score;
            filename = prediction.filename;
        }

        if (score===undefined) {
            return (
                <AuthErrorView/>
            );
        } else {
            const days = GetDays(score);

            if (days==='[error]' || accuracy===undefined) {
                return (
                    <AuthErrorView/>
                );
            } else {
                this.saveimg(score, accuracy, filename, username, img);

                return (
                    <AuthResultsView img={img}
                                     days={days}
                                     accuracy={accuracy}/>
                );
            }
        }
    }
}
export default AuthResults;