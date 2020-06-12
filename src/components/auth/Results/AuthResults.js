import React from 'react';
import '../../../css/App.css';
import axios from 'axios';
import AuthErrorView from './views/AuthErrorView';
import AuthResultsView from './views/AuthResultsView';

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

        const scoreRegex = /score:(.*?),/;
        const accRegex = /accuracy:(0\.\d\d)/;
        const filenameRegex = /filename:(.*?)END/

        const score = scoreRegex.exec(prediction);
        const accuracy = accRegex.exec(prediction);
        const filename = filenameRegex.exec(prediction);

        var days = '[error]';
        switch(true) {
            case score[1]=='1.0':
                days='1 day';
                break;
            case score[1]=='2.0':
                days='2 days';
                break;
            case score[1]=='3.0':
                days='3 days';
                break;
            case score[1]=='4.0':
                days='4 days';
                break;
            case score[1]=='5.0':
                days='5 days';
                break;
            case score[1]=='6.0':
                days='6 days';
                break;
            case score[1]=='7.0':
                days='7 days';
                break;
        }

        if (!score || score==null || accuracy==null) {
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