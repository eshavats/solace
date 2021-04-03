import "./App.css";
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Header from "./constants/Header";
import Register from "./register/Register";
import Login from "./login/Login";
import Home from "./home/Home";

const App = () => {
  return (
    <div className="">
      <BrowserRouter>
        <div>
          <Header />
          <Switch>
            <Route path="/" exact component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/home" component={Home} />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
