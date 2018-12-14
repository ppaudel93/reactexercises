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
  componentDidMount() {
    document.getElementById("calculatorid").style.display = "none";
  }
  pushtoCalculationStack = item => {
    console.log(item);
    if (typeof item !== "string") {
      item = item.target.value;
    }
    if (this.state.currentStack.length !== 0) {
      let temp = "";
      for (let item of this.state.currentStack) {
        temp = temp + item;
      }
      temp = Number(temp);
      this.setState({
        currentStack: [],
        calculationStack: this.state.calculationStack.concat(temp).concat(item),
        displayHeader: this.state.displayHeader.concat(item)
      });
    } else {
      this.setState({
        currentStack: [],
        calculationStack: [...this.state.calculationStack, item],
        displayHeader: this.state.displayHeader.concat(item)
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

  handleKeyPress = e => {
    let nums = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];
    let signs = ["+", "-", "*", "/", "^", "(", ")"];
    console.log(e.key);
    for (let item of nums) {
      if (e.key === item) {
        this.setState({
          currentStack: this.state.currentStack.concat(item),
          displayHeader: this.state.displayHeader.concat(item)
        });
      }
    }
    if (e.key === "=") {
      this.handleCalculation();
    }
    if (e.key === "r" || e.key === "R") {
      this.handleClear();
    }
    if (e.key === "Backspace") {
      this.handleClearOne();
    }
    for (let item of signs) {
      if (e.key === item) {
        this.pushtoCalculationStack(e.key);
      }
    }
  };

  handleClearOne = () => {
    if (this.state.currentStack.length !== 0) {
      console.log("CurrentStack is not empty");
      this.state.currentStack.pop();
      this.state.displayHeader.pop();
      this.setState({
        currentStack: this.state.currentStack,
        displayHeader: this.state.displayHeader
      });
    } else {
      console.log("CurrentStack is empty");
      this.state.calculationStack.pop();
      this.setState({
        calculationStack: this.state.calculationStack,
        displayHeader: [...this.state.calculationStack]
      });
    }
  };
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
                  onClick={this.handleClearOne}
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
      <div
        id="calculatorid"
        className="container"
        onKeyDown={this.handleKeyPress}
      >
        <div className="row justify-content-center height-50 text-center alert alert-primary border border-primary mb-2 bg-white">
          <div className="col">{this.state.displayHeader}</div>
        </div>
        {buttonGroup}
        <div className="row justify-content-center">
          <button
            className="col btn btn-primary p-3 rounded-0"
            onClick={this.handleClear}
          >
            Reset(R)
          </button>
        </div>
      </div>
    );
  }
}

export default Calculator;
