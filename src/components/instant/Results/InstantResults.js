import React from 'react';
import '../../../css/App.css';
import InstantResultsErrorView from './views/InstantResultsErrorView';
import InstantResultsOkView from './views/InstantResultsOkView';
import GetDays from "../../../func/GetDays";

class InstantResults extends React.Component {

    render() {
        const img = this.props.location.state.img;

        const prediction = this.props.location.state.prediction;

        const accuracy = prediction.accuracy;
        const score = prediction.score;

        if (score===undefined) {
            return (
                <InstantResultsErrorView/>
            )
        } else {
            const days = GetDays(score);

            if (days==='[error]' || accuracy===undefined) {
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