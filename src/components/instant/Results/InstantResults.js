import React from 'react';
import '../../../css/App.css';
import InstantResultsErrorView from './views/InstantResultsErrorView';
import InstantResultsOkView from './views/InstantResultsOkView';
import GetDaysAndAcc from "../../../func/GetDaysAndAcc";

class InstantResults extends React.Component {

    render() {
        const img = this.props.location.state.img;

        const prediction = this.props.location.state.prediction;

        const scoreRegex = /score:(.*?),/;
        const score = scoreRegex.exec(prediction);

        if (score===null) {
            return (
                <InstantResultsErrorView/>
            )
        } else {
            const daysAndAcc = GetDaysAndAcc(prediction);
            const days = daysAndAcc[0];
            const accuracy = daysAndAcc;

            if (days==='[error]' || accuracy===null) {
                return (
                    <InstantResultsErrorView/>
                )
            } else {
                return (
                    <InstantResultsOkView img={img}
                                          days={days}
                                          accuracy={accuracy}/>
                )
            }
        }
    }
}
export default InstantResults;