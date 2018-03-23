import React, {Component} from 'react';
import {render} from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Link } from "react-router-dom";

import store from './store';
import BasicDemo from './demos/BasicDemo';
import ReduxFormDemo from './demos/ReduxFormDemo';

import './index.css';

render(
  <Provider store={store}>
    <BrowserRouter>
      <div className="container">
        <h1>react-geo-picker</h1>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/redux-form">ReduxForm</Link>
          </li>
        </ul>

        <hr />

        <Route exact path="/" component={BasicDemo} />
        <Route exact path="/redux-form" component={ReduxFormDemo} />
      </div>
    </BrowserRouter>
  </Provider>,
  document.querySelector('#demo'),
);
