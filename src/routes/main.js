import React from 'react';
import { Switch, Route } from 'react-router-dom';

import InstantHome from '../components/instant/Home/InstantHome';
import AuthSuccess from '../components/auth/Success/AuthSuccess';
import InstantResults from '../components/instant/Results/InstantResults';
import AuthResults from '../components/auth/Results/AuthResults';
import AuthPersonalBananas from '../components/auth/Personal-bananas/AuthPersonalBananas';
import InstantAbout from '../components/instant/InstantAbout';

const Main = () => {
    return (
        <Switch>
            <Route exact path='/' component={InstantHome}></Route>
            <Route exact path='/results' component={InstantResults}></Route>
            <Route exact path='/success' component={AuthSuccess}></Route>
            <Route exact path='/auth/results' component={AuthResults}></Route>
            <Route exact path='/auth/personalBananas' component={AuthPersonalBananas}></Route>
            <Route exact path='/about' component={InstantAbout}></Route>
        </Switch>
    );
}

export default Main;