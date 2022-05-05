import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux'
import 'antd/dist/antd.css'
import { applyMiddleware, createStore, compose } from 'redux'; // redux에서 미들웨어 적용한 store 생성
import promiseMiddleware from 'redux-promise'
import ReduxThunk from 'redux-thunk'
import rootReducer from './_reducers/index'


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION__ || compose
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(promiseMiddleware, ReduxThunk)))


ReactDOM.render(
  <Provider
    store={store}
  >
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
