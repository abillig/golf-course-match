import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router';
import thunk from 'redux-thunk';
import reducers from './reducers';
import createBrowserHistory from 'history/createBrowserHistory'
require("babel-polyfill");

const history = createBrowserHistory()

import App from './App'
// import './index.css';

// var browserHistory = ReactRouter.browserHistory;
// var { Router, Route, IndexRoute, Link, browserHistory } = ReactRouter

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(reducers);


require("babel-polyfill");
  //
  // let buttonNames=[]
  // for(var category in golf_options.price){
  //   buttonNames.push(category)
  // }

  ReactDOM.render(
    <Provider store={store}>
    <Router history={history}>
      <div>
        <Route path="/" component={App}/>

      </div>
    </Router>
    </Provider>,
    document.getElementById('root')
  );
