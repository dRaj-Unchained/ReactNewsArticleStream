import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Blog';
import * as serviceWorker from './serviceWorker';
import {getArticle,getSubscription} from './service';
import _ from 'underscore';


const artList = getArticle(); 
let topArticle = [];
const topArticleid = window.location.search.split('=')[1] ;
topArticle =_.filter(artList, function(art){ return art.id != topArticleid; });
topArticleid && topArticle.unshift(_.find(artList, function(art){ return art.id == topArticleid; }));

ReactDOM.render(
  <React.StrictMode>
    <App data={topArticle} subscriptiondata={getSubscription()}/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
