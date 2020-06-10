import logo from "../../../../jpg/logo0.jpg";
import logo_title from "../../../../jpg/logotitle.jpg";
import {Link} from "react-router-dom";
import React, {Component} from "react";

class Landing_page extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <div className="App-break"/>
                    <img src={logo} className="App-logo" alt="logo"/>
                    <div className="App-break"/>
                    <img src={logo_title}/>
                    {this.props.logout_message}
                    <button variant="outlined" onClick={this.props.do_register}>
                        Register
                    </button>
                    {this.props.form_register}
                    <button variant="outlined" onClick={this.props.do_login}>
                        Log-in
                    </button>
                    {this.props.form_login}
                    <input type="file" name="avatar" onChange={this.props.fileChangedHandler}/>
                    <button type="button" onClick={this.props.submit_loading}> Upload</button>
                    {this.props.loading_component}
                    {this.props.error_msg}
                    {this.props.image_preview}
                    <div className="App-break"/>
                    <Link to="/about">
                        <button variant="outlined">
                            About
                        </button>
                    </Link>
                </header>
            </div>
        )
    }
}

export default Landing_page;