import React, { Component } from "react";
import "./DialogBox.css";

class DialogBox extends Component {
  hideAlert = () => {
    document.getElementById("alertdiv").style.display = "none";
    document.getElementById("calculatorid").style.display = "block";
    document.getElementById("maindiv").className =
      document.getElementById("maindiv").className + " border";
  };
  render() {
    return (
      <div
        id="alertdiv"
        className="sticky container border border-secondary p-2"
      >
        <h3 className="col">
          Keyboard shortcuts can be used once focused on the calculator
        </h3>
        <h3 className="col">Use Backspace to clear one at a time.</h3>
        <h3 className="col">Use numbers and signs to type.</h3>
        <h3 className="col">Use R to reset.</h3>
        <div className="row justify-content-center">
          <button
            onClick={this.hideAlert}
            className="col-11 btn btn-primary p-3 rounded-0"
          >
            OK
          </button>
        </div>
      </div>
    );
  }
}

export default DialogBox;
