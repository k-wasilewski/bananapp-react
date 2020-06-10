import React, {Component} from "react";
import {Link} from "react-router-dom";

class Results_error extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h3>File already exists or file type not supported or it's not a banana, try again</h3>
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
export default Results_error;