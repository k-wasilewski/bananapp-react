import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from "../components/instant/Home/Home";
import Auth_success from "../components/auth/Success/Auth_success";
import Results from "../components/instant/Results/Results";
import Auth_results from "../components/auth/Results/Auth_results";
import Auth_personalBananas from "../components/auth/Personal-bananas/Auth_personal-bananas";
import About from "../components/instant/About";

const Main = () => {
    return (
        <Switch>
            <Route exact path='/' component={Home}></Route>
            <Route exact path='/results' component={Results}></Route>
            <Route exact path='/success' component={Auth_success}></Route>
            <Route exact path='/auth/results' component={Auth_results}></Route>
            <Route exact path='/auth/personalBananas' component={Auth_personalBananas}></Route>
            <Route exact path='/about' component={About}></Route>
        </Switch>
    );
}

export default Main;