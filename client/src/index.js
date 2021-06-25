import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import App from './App';
import '../src/style/index.css'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
   <Switch>
    <Route path='/' component={App} />
   </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
