import React from 'react';
import './App.scss';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import HomePage from './Pages/Homepage';
import NotFoundPage from './Pages/NotFoundPage';
import KitsPage from './Pages/KitsPage';
import SearchFreelancerPage from './Pages/SearchPage/SearchFreelancerPage';
import SearchTeamPage from './Pages/SearchPage/SearchTeamPage';
import SearchProjectPage from './Pages/SearchPage/SearchProjectPage';
import FreelancerPage from './Pages/FreelancerPage';
function App() {
  return (
    <BrowserRouter>
      <Switch>
          <Route path="/" component={HomePage} exact={true} />
          <Route path="/kit" component={KitsPage} />
          <Route path="/search/category/freelancer/keyword/:keyword" component={SearchFreelancerPage} />
          <Route path="/search/category/freelancer/keyword/:keyword" component={SearchTeamPage} />
          <Route path="/search/category/freelancer/keyword/:keyword" component={SearchProjectPage} />

          <Route path="/freelancer/:id" component={FreelancerPage}/>
          <Route component={NotFoundPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
