import React, { Component } from "react";
import "./App.css";
import Calculator from "./Components/Client/Calculator/Calculator";
import DialogBox from "./Components/Client/DialogBox/DialogBox";

class App extends Component {
  render() {
    return (
      <div id="maindiv" className="container h-100 border-secondary p-2 mt-2">
        <DialogBox />
        <Calculator />
      </div>
    );
  }
}

export default App;
