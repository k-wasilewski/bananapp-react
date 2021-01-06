import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './App';
import { StoreProvider } from './StoreContext';
import { RootStore } from './stores/RootStore';

//RootStore can be passed to App as a prop as well

ReactDOM.render((
    <StoreProvider value={new RootStore()} >    
        <App />
    </StoreProvider>
    ), document.getElementById('root')
);
