import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class AuthErrorView extends Component {
    render() {
        return (
            <div className='App'>
                <header className='App-header'>
                    <h3>File type not supported or it's not a banana, try again</h3>
                    <Link to='/success'>
                        <button variant='outlined'>
                            Back
                        </button>
                    </Link>
                </header>
            </div>
        );
    }
}
export default AuthErrorView;