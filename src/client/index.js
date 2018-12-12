import { render } from "react-dom";
import React, { Component } from "react";
import { Router, browserHistory } from "react-router";
import routes from "./Routes/routes";

render(
  <div>
    <Router history={browserHistory} routes={routes} />
  </div>,
  document.getElementById("app")
);
