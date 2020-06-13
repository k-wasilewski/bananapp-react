import React from 'react';
import '../../../css/App.css';
import axios from 'axios';
import AuthErrorView from './views/AuthErrorView';
import AuthResultsView from './views/AuthResultsView';
import GetDaysAndAcc from "../../../func/GetDaysAndAcc";

class AuthResults extends React.Component {

    saveimg = (score, acc, filename, username, pic_link) => {
        axios.post('http://localhost:8081/auth/saveimg',
            `filename=${filename[1]}&score=${score[1]}&acc=${acc[1]}
            &uname=${username}&link=${pic_link.split('+').join('plussign')}`,
            {withCredentials: true}
        )};


    render() {
        const img = this.props.location.state.img;
        const prediction = this.props.location.state.prediction;
        const username = this.props.location.state.username;

        const filenameRegex = /filename:(.*?)END/
        const filename = filenameRegex.exec(prediction);

        const daysAndAcc = GetDaysAndAcc(prediction);
        const days = daysAndAcc[0];
        const accuracy = daysAndAcc[1];

        const scoreRegex = /score:(.*?),/;
        const score = scoreRegex.exec(prediction);

        if (days==='[error]' || accuracy===null || score===null) {
            return (
                <AuthErrorView/>
            )
        } else {
            this.saveimg(score, accuracy, filename, username, img);

            return (
                <AuthResultsView img={img}
                                 days={days}
                                 acc={accuracy[1]}/>
            );
        }
    }
}
export default AuthResults;