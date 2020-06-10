import React from 'react';
import {Link} from "react-router-dom";
import '../../../css/App.css';
import Results_error from "./views/Results_error";
import Results_ok from "./views/Results_ok";

class Results extends React.Component {

    render() {
        const img = this.props.location.state.img;

        const prediction = this.props.location.state.prediction;

        const scoreRegex = /score:(.*?),/;
        const accRegex = /accuracy:(0\.\d\d)/;

        const score = scoreRegex.exec(prediction);
        const accuracy = accRegex.exec(prediction);

        var days = '[error]';
        switch(true) {
            case score[1]==1.0:
                days="1 day";
                break;
            case score[1]==2.0:
                days="2 days";
                break;
            case score[1]==3.0:
                days="3 days";
                break;
            case score[1]==4.0:
                days="4 days";
                break;
            case score[1]==5.0:
                days="5 days";
                break;
            case score[1]==6.0:
                days="6 days";
                break;
            case score[1]==7.0:
                days="7 days";
                break;
        }

        if (!score || score==null || accuracy==null) {
            return (
               <Results_error/>
            )
        } else {
            return (
                <Results_ok img={img}
                            days={days}
                            accuracy={accuracy}/>
            )
        }
    }
}
export default Results;