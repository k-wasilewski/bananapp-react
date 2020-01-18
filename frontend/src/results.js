import React from 'react';
import {Link} from "react-router-dom";
import './App.css';

class Results extends React.Component {

    render() {
        const img = this.props.location.state.img;

        const prediction = this.props.location.state.prediction;
        console.log("prediction at front: "+prediction);

        const scoreRegex = /score:(.*?),/;
        const accRegex = /accuracy:(0\.\d\d)/;

        const score = scoreRegex.exec(prediction);
        const accuracy = accRegex.exec(prediction);

        var days = '[error]';
        if (score[1]==1.0) days="1 day";
        else if (score[1]==2.0) days="2 days";
        else if (score[1]==3.0) days="3 days";
        else if (score[1]==4.0) days="4 days";
        else if (score[1]==5.0) days="5 days";
        else if (score[1]==6.0) days="6 days";
        else if (score[1]==7.0) days="7 days";

        return (
            <div className="App">
                <header className="App-header">
                    <img src={img} style={{maxHeight: "500px"}} />
                    <h3> your banana is { days } old </h3>
                    <h3> with { accuracy[1]*100 }% certainty</h3>
                    <Link to="/">
                        <button variant="outlined">
                            back
                        </button>
                    </Link>
                </header>
            </div>
        );
    }
}
export default Results;