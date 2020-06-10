import React, {Component} from "react";
import {Link} from "react-router-dom";
import Auth_home from '../../Home/Auth_home';

class Success extends Component {
    render() {
        var $this = this;

        return (
            <div className="App">
                <header className="App-header">
                    <h3> Logged-in as { this.props.username }</h3>
                    < Auth_home username={this.props.username}/>
                    <Link to={{
                        pathname: "/auth/personalBananas",
                        state: {
                            username: $this.props.username
                        }
                    }}>
                        <button variant="outlined">
                            Personal bananas
                        </button>
                    </Link>
                    <button variant="outlined" onClick={this.props.logout}>
                        Logout
                    </button>
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
export default Success;