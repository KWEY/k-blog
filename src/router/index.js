import React, { Component } from 'react';
import {BrowserRouter,Route,Switch } from 'react-router-dom'

import App from '../page/App'
import Nav from '../page/Nav'
import Tojson from '../page/Tojson'
import Article from '../page/Article'
import To404 from '../page/To404'

const Articles = () =>(
  <Switch>
      <Route exact path="/article" component={Article}></Route>
      <Route path="/article/:id" component={Article}></Route>
  </Switch>
)

export default class AppRouter extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={App}></Route>
                    <Route path="/nav" component={Nav}></Route>
                    <Route path="/tojson" component={Tojson}></Route>
                    <Route path="/article" component={Articles}></Route>
                    <Route path="*" component={To404}></Route>
                </Switch>
            </BrowserRouter>
        )
    }
}
