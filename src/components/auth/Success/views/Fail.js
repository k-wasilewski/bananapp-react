import React, {Component} from "react";
import {Link} from "react-router-dom";

class Fail extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h3> Login failed, try again</h3>
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
export default Fail;