import "./App.css";
import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

import Header from "./constants/Header";
import Register from "./register/Register";
import Login from "./login/Login";
import Home from "./home/Home";
import Music from "./music/Music";
import About from "./about/about";
import Blogs from "./blogs/Blogs";
import Create from "./create/Create"

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
            <Route path="/create" component={Create} />
            <Route path="/music" component={Music} />
            <Route path="/about" component={About} />
            <Route path="/blogs" component={Blogs} />

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
