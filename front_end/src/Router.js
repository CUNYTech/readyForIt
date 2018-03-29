import { BrowserRouter, Route, Switch } from 'react-router-dom' ;
import App from './components/App';
import React from 'react';

const Router = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={App} />
        </Switch>
    </BrowserRouter>
)
 
export default Router;