import React from 'react';
import '../../../css/App.css';
import InstantResultsView from "./views/InstantResultsView";
import GetDays from "../../../func/GetDays";

class InstantResults extends React.Component {

    render() {
        const img = (this.props.location.state !== undefined) ?
            this.props.location.state.img : undefined;

        const prediction = (this.props.location.state !== undefined) ?
            this.props.location.state.prediction : undefined;
        const accuracy = (this.props.location.state !== undefined) ?
            prediction.accuracy : undefined;
        const score = (this.props.location.state !== undefined) ?
            prediction.score : undefined;
        const days = (score === undefined) ? undefined : GetDays(score);

        if (score === undefined || days === '[error]' || accuracy === undefined) return (
            <InstantResultsView/>
        );
        else return (
            <InstantResultsView img={img}
                                days={days}
                                accuracy={accuracy}/>
        );
    };
}

export default InstantResults;