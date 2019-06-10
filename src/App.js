import React from 'react';
import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import HomePage from './Pages/Homepage';
import NotFoundPage from './Pages/NotFoundPage';

function App() {
  return (
    <BrowserRouter>
      <Switch>
          <Route path="/" component={HomePage} exact={true} />
          <Route component={NotFoundPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
