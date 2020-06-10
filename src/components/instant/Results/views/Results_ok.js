import React, {Component} from "react";
import {Link} from "react-router-dom";

class Results_ok extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={this.props.img} style={{maxHeight: "500px"}} />
                    <h3> Your banana is { this.props.days } old, </h3>
                    <h3> with { Number((this.props.accuracy[1]*100).toFixed(2)) }% certainty</h3>
                    <Link to="/">
                        <button variant="outlined">
                            Back
                        </button>
                    </Link>
                </header>
            </div>
        )
    }
}
export default Results_ok;