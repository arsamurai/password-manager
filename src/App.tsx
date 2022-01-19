import React from "react";
import logo from "./logo.svg";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import "./scss/app.scss";
import {Login, Register, Dashboard} from "./pages/index";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" render={() => <Login />} exact />
        <Route
          path="/dashboard/:login"
          render={(props) => <Dashboard login={props.match.params.login} />}
          exact
        />
        <Route path="/registration" render={() => <Register />} exact />
        <Redirect to="/login" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
