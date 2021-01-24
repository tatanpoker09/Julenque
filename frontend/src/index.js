import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Room from './App.jsx';
import {
    Switch,
    Route,
    BrowserRouter
} from "react-router-dom";


import LanderPage from "./components/LanderPage/LanderPage";

ReactDOM.render(
  <BrowserRouter>
          <Switch>
              <Route exact path={"/lobby"} component={LanderPage}/>
              <Route path={"/:game"} component={Room}/>
          </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
