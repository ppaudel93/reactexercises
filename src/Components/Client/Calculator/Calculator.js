import React, { Component } from "react";
import generatePrecedence from "./generatePrecedence";
import calculateFromPostfix from "./calculateFromPostfix";
import "./calculator.css";

class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStack: [],
      calculationStack: [],
      displayHeader: [],
      postfixExpn: []
    };
  }
  handleClear = () => {
    this.setState({
      currentStack: [],
      calculationStack: [],
      displayHeader: [],
      postfixExpn: []
    });
  };
  pushtoCalculationStack = e => {
    if (this.state.currentStack.length !== 0) {
      let temp = "";
      for (let item of this.state.currentStack) {
        temp = temp + item;
      }
      temp = Number(temp);
      this.setState({
        currentStack: [],
        calculationStack: this.state.calculationStack
          .concat(temp)
          .concat(e.target.value),
        displayHeader: this.state.displayHeader.concat(e.target.value)
      });
    } else {
      this.setState({
        currentStack: [],
        calculationStack: [...this.state.calculationStack, e.target.value],
        displayHeader: this.state.displayHeader.concat(e.target.value)
      });
    }
  };

  handleCalculation = () => {
    let temp = "";
    for (let item of this.state.currentStack) {
      temp = temp + item;
    }
    temp = Number(temp);
    let outputPfix = [];
    let operatorStack = [];
    this.setState(
      {
        calculationStack: ["(", ...this.state.calculationStack, temp, ")"]
      },
      () => {
        for (let item of this.state.calculationStack) {
          if (typeof item === "number") {
            outputPfix.push(item);
          } else {
            switch (item) {
              case "^": {
                operatorStack.push(item);
                break;
              }
              case "(": {
                operatorStack.push(item);
                break;
              }
              case ")": {
                for (
                  let i = operatorStack.length - 1;
                  operatorStack[i] !== "(";
                  i--
                ) {
                  let temp = operatorStack.pop();
                  outputPfix.push(temp);
                }
                operatorStack.pop();
                break;
              }
              default: {
                while (
                  item !== "^" &&
                  this.state.calculationStack !== [] &&
                  generatePrecedence(item) <=
                    generatePrecedence(operatorStack[operatorStack.length - 1])
                ) {
                  let temp = operatorStack.pop();
                  outputPfix.push(temp);
                }
                operatorStack.push(item);
                break;
              }
            }
          }
        }
        this.setState(
          {
            postfixExpn: outputPfix
          },
          () => {
            this.setState({
              displayHeader: calculateFromPostfix(...this.state.postfixExpn),
              currentStack: calculateFromPostfix(...this.state.postfixExpn),
              calculationStack: [],
              postfixExpn: []
            });
          }
        );
      }
    );
  };

  handleClick = e => {
    this.setState({
      currentStack: this.state.currentStack.concat(e.target.value),
      displayHeader: this.state.displayHeader.concat(e.target.value)
    });
  };

  createButton = () => {};
  render() {
    let row1 = [
      [7, 8, 9, "+"],
      [4, 5, 6, "-"],
      [1, 2, 3, "*"],
      [".", 0, "=", "/"],
      ["(", ")", "^", "C"]
    ];
    const buttonGroup = row1.map(item => (
      <div className="row justify-content-center">
        {item.map(innerItem => {
          if (typeof innerItem === "number" || innerItem === ".") {
            return (
              <button
                key={innerItem}
                className="col btn btn-primary p-3 rounded-0"
                onClick={this.handleClick}
                value={innerItem}
              >
                {innerItem}
              </button>
            );
          } else {
            if (innerItem === "=") {
              return (
                <button
                  key={innerItem}
                  className="col btn btn-primary p-3 rounded-0"
                  onClick={this.handleCalculation}
                  value={innerItem}
                >
                  {innerItem}
                </button>
              );
            } else if (innerItem === "C") {
              return (
                <button
                  key={innerItem}
                  className="col btn btn-primary p-3 rounded-0"
                  onClick={this.handleClear}
                  value={innerItem}
                >
                  {innerItem}
                </button>
              );
            } else {
              return (
                <button
                  key={innerItem}
                  className="col btn btn-primary p-3 rounded-0"
                  onClick={this.pushtoCalculationStack}
                  value={innerItem}
                >
                  {innerItem}
                </button>
              );
            }
          }
        })}
      </div>
    ));
    return (
      <div className="container">
        <div className="row justify-content-center height-50 text-center alert alert-primary border border-primary mb-2 bg-white">
          <div className="col">{this.state.displayHeader}</div>
        </div>
        {buttonGroup}
      </div>
    );
  }
}

export default Calculator;
