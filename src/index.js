import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Blog';
import * as serviceWorker from './serviceWorker';
import {getArticle,getSubscription} from './service';

ReactDOM.render(
  <React.StrictMode>
    <App data={getArticle()} subscriptiondata={getSubscription()}/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
