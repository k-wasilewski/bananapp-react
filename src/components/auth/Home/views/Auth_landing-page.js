import React, {Component} from "react";

class Auth_landingPage extends Component {
    render() {
        return (
            <div>
                <header>
                    <input type="file" name="avatar" onChange={this.props.fileChangedHandler} />
                    <button type="button" onClick={this.props.submit_loading} > Upload </button>
                    { this.props.loading_component }
                    { this.props.error_msg }
                    { this.props.$imagePreview }
                </header>
            </div>
        )
    }
}
export default Auth_landingPage;