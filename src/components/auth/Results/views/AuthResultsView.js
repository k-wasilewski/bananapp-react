import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class AuthResultsView extends Component {
    render() {
        return (
            <div className='App'>
                <header className='App-header'>
                    <img src={this.props.img} className='img' alt='your banana' />
                    <h3> Your banana is { this.props.days } old, </h3>
                    <h3> with { Number((this.props.accuracy*100).toFixed(2)) }%
                        certainty</h3>
                    <Link to='/success'>
                        <button variant='outlined'>
                            Back
                        </button>
                    </Link>
                </header>
            </div>
        )
    }
}
export default AuthResultsView;