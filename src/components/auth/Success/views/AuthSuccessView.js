import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import AuthHome from '../../Home/AuthHome';
import {setUsername} from '../../../../redux/actions';
import { connect } from 'react-redux';

class AuthSuccessView extends Component {
    render() {
        const $this = this;

        return (
            <div className='App'>
                <header className='App-header'>
                    <h3> Logged-in as { this.props.username }</h3>
                    <AuthHome username={this.props.username}/>
                    <Link to={{
                        pathname: '/auth/personalBananas',
                        state: {
                            username: $this.props.username
                        }
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
        )
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