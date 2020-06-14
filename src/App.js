import React, {Component} from 'react';
import './css/App.css';
import BananappRouter from './routes/BananappRouter';

class App extends Component {

  render() {
    return (
        <div className='App'>
            <BananappRouter />
        </div>
    );
  }
}

export default App;