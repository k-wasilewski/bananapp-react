import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class InstantResultsView extends Component {
    render() {
        const content = (this.props.img===undefined && this.props.days===undefined
            && this.props.accuracy===undefined) ?
            (<h3>File type not supported or it's not a banana, try again</h3>)
            :
            (<React.Fragment>
                <img src={this.props.img} className='img' alt='your banana'/>
                <h3> Your banana is { this.props.days } old, </h3>
                <h3> with { Number((this.props.accuracy*100).toFixed(2)) }% certainty</h3>
            </React.Fragment>
                );

        return (
            <div className='App'>
                <header className='App-header'>
                    {content}
                    <Link to='/'>
                        <button variant='outlined'>
                            Back
                        </button>
                    </Link>
                </header>
            </div>
        );
    }
}
export default InstantResultsView;