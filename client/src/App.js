import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//Pages
import LandingPage from './pages/LandingPage/LandingPage'
import LoginPage from './pages/LoginPage/LoginPage'
import RegisterPage from './pages/RegisterPage/RegisterPage'
import HomePage from './pages/HomePage/HomePage'

const App = () => {

  useEffect(() => {
    //Load current user here
  }, [])

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

          {/* <Route path="/home" component={HomePage} /> */}
          <Route path="/channels/me" component={HomePage} />

        </Switch>
      </Router>
    </div>
  );
}

export default App;