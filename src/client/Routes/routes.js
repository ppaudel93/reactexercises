import React, { Component } from "react";
import { Router, Route, browserHistory, IndexRoute } from "react-router";

import App from "../App";
import Gallery from "../Components/Gallery/Gallery";
import TextDisplay from "../Components/Home/TextDisplay";

export default (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={TextDisplay} />
      <Route path="/gallery" component={Gallery} />
    </Route>
  </Router>
);
