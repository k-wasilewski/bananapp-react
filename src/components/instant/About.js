import React, {Component} from 'react';
import {Link} from "react-router-dom";
import '../../css/App.css';

class About extends Component {

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <div className="col-13 text-left">
                        <h5>Kuba Wasilewski <br/>
                        <a href="https://github.com/k-wasilewski">@k-wasilewski </a><br/>
                        <a className="nav-link color-header" href="mailto:k.k.wasilewski@gmail.com">
                        k.k.wasilewski@gmail.com</a></h5></div>
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
export default About;