import React, {Component} from 'react';
import './css/App.css';
import Main from "./routes/main";

class App extends Component {

  render() {
    return (
        <div className="App">
            <Main />
        </div>
    );
  }
}

export default App;