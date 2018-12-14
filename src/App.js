import React, { Component } from "react";
import "./App.css";
import Calculator from "./Components/Client/Calculator/Calculator";

class App extends Component {
  render() {
    return (
      <div className="container h-100 border border-secondary p-2 mt-2">
        <Calculator />
      </div>
    );
  }
}

export default App;
