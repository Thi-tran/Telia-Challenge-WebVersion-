import React from 'react';
import './App.scss';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import HomePage from './Pages/Homepage';
import NotFoundPage from './Pages/NotFoundPage';
import KitsPage from './Pages/KitsPage';

function App() {
  return (
    <BrowserRouter>
      <Switch>
          <Route path="/" component={HomePage} exact={true} />
          <Route path="/kit" component={KitsPage} />
          <Route component={NotFoundPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
