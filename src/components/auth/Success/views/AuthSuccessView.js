import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';
import AuthHome from '../../Home/AuthHome';
import {setUsername} from '../../../../redux/actions';
import { connect } from 'react-redux';

class AuthSuccessView extends Component {
    render() {
        const $this = this;

        if (this.props.username!==undefined && this.props.logout!==undefined)
            return (
            <div className='App'>
                <header className='App-header'>
                    <h3> Logged-in as { this.props.username }</h3>
                    <AuthHome />
                    <Link to={{
                        pathname: '/auth/personalBananas'
                    }}>
                        <button variant='outlined'>
                            Personal bananas
                        </button>
                    </Link>
                    <button variant='outlined' onClick={this.props.logout}>
                        Logout
                    </button>
                </header>
            </div>
        );
        else if (this.props.isLogout===true)
            return (<Redirect to={{
                pathname: '/',
                state: { logout: true }
            }}/>)
        else return (<div className='App'>
                <header className='App-header'>
                    <h3> Login failed, try again</h3>
                    <Link to='/'>
                        <button variant='outlined'>
                            Back
                        </button>
                    </Link>
                </header>
            </div>);
    }
}

function mapStateToProps(state) {
    return {
        username: state.setUsernameReducer.username,
    };
};

const mapDispatchToProps = {
    setUsername
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthSuccessView);