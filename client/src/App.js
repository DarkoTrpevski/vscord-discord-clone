import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//Pages
import LandingPage from './pages/LandingPage/LandingPage'
import LoginPage from './pages/LoginPage/LoginPage'
import RegisterPage from './pages/RegisterPage/RegisterPage'

const App = () => {
  return (
    <div className="App">
      <Router>
        <Switch>

          <Route exact path="/" render={(props) => (
            <LandingPage {...props} />
          )} />

          <Route path={[`/login`, `/register`]}>
            <Route path="/login" component={LoginPage} />
            <Route path="/register" component={RegisterPage} />
          </Route>

          <Route path="/register" component={HomePage} />

        </Switch>
      </Router>
    </div>
  );
}

export default App;