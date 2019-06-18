import React from 'react';
import './App.scss';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import HomePage from './Pages/Homepage';
import NotFoundPage from './Pages/NotFoundPage';
import KitsPage from './Pages/KitsPage';
import SearchFreelancerPage from './Pages/SearchPage/SearchFreelancerPage';
import SearchTeamPage from './Pages/SearchPage/SearchTeamPage';
import SearchProjectPage from './Pages/SearchPage/SearchProjectPage';
import FreelancerPage from './Pages/ResultPage/FreelancerPage';
import ProjectPage from './Pages/ResultPage/ProjectPage';
import TeamPage from './Pages/ResultPage/TeamPage';
function App() {
  return (
    <BrowserRouter>
      <Switch>
          <Route path="/" component={HomePage} exact={true} />
          <Route path="/kit" component={KitsPage} />
          <Route path="/search/category/freelancer/keyword/:keyword" component={SearchFreelancerPage} />
          <Route path="/search/category/team/keyword/:keyword" component={SearchTeamPage} />
          <Route path="/search/category/project/keyword/:keyword" component={SearchProjectPage} />

          <Route path="/freelancer/:id" component={FreelancerPage}/>
          <Route path="/team/:id" component={TeamPage}/>
          <Route path="/project/:id" component={ProjectPage}/>

          <Route component={NotFoundPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
