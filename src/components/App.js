import "./App.css";
import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

import Header from "./constants/Header";
import Register from "./register/Register";
import Login from "./login/Login";
import Home from "./home/Home";
import Music from "./music/Music";
import history from "./history";

const App = (props) => {
  return (
    <div className="">
      <Router history={history}>
        <div>
          <Header />
          <Switch>
            <Route path="/" exact component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/home" component={Home} />
            <Route path="/music" component={Music} />
          </Switch>
        </div>
      </Router>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { user: state.users };
};

export default connect(mapStateToProps)(App);
