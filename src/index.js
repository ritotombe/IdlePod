import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import {BrowserRouter, Route, Switch} from 'react-router-dom'

import Landing from './components/landing'
import Question from './components/question'

import reducers from './reducers'

import './style/style.css'

const createStoreWithMiddleware = applyMiddleware()(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/q/:num" component={Question}/>
          <Route path="/" component={Landing}/>
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>
  , document.querySelector('.container'))
