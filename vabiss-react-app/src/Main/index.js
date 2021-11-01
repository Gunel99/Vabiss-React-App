import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Structure from "../Structure";

const Main = () => {
  return (
    <Switch>
      <Route path="/structure" exact>
        <Structure />
      </Route>
      <Redirect exact from="/" to="/structure" />
    </Switch>
  );
};

export default Main;
