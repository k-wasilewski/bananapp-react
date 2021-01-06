import logo from '../../../../jpg/logo0.jpg';
import logoTitle from '../../../../jpg/logotitle.jpg';
import {Link, Redirect} from 'react-router-dom';
import React, {Component} from 'react';

class InstantHomeView extends Component {
    render() {
        if (this.props.prediction===undefined && this.props.img===undefined)
            return (
            <div className='App'>
                <header className='App-header'>
                    <div className='App-break'/>
                    <img src={logo} className='App-logo' alt='logo'/>
                    <div className='App-break'/>
                    <img src={logoTitle} alt='logo-title'/>
                    {this.props.logoutMessage}
                    <button variant='outlined' onClick={this.props.doRegister}>
                        Register
                    </button>
                    {this.props.formRegister}
                    <button variant='outlined' onClick={this.props.doLogin}>
                        Log-in
                    </button>
                    {this.props.formLogin}
                    <input type='file' name='avatar' onChange={this.props.fileChangedHandler}/>
                    <button type='button' onClick={this.props.submitLoading}> Upload</button>
                    {this.props.loadingComponent}
                    {this.props.errorMsg}
                    {this.props.imagePreview}
                    <div className='App-break'/>
                    <Link to='/about'>
                        <button variant='outlined'>
                            About
                        </button>
                    </Link>
                </header>
            </div>
        );
        else return (
            <Redirect to={{
                pathname: '/results',
                state: { prediction: this.props.prediction,
                    img: this.props.img}
            }}/>
        );
    }
}

export default InstantHomeView;