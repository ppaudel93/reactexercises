import React, { Component } from "react";
import generatePrecedence from "./generatePrecedence";

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
  handleCalculation = () => {
    this.toPostfix();
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
          .concat(e.target.innerHTML),
        displayHeader: this.state.displayHeader.concat(e.target.innerHTML)
      });
    } else {
      this.setState({
        currentStack: [],
        calculationStack: [...this.state.calculationStack, e.target.innerHTML],
        displayHeader: this.state.displayHeader.concat(e.target.innerHTML)
      });
    }
  };

  toPostfix = () => {
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
        this.setState({
          postfixExpn: outputPfix
        });
      }
    );
  };

  handleClick = e => {
    this.setState({
      currentStack: this.state.currentStack.concat(e.target.innerHTML),
      displayHeader: this.state.displayHeader.concat(e.target.innerHTML)
    });
  };
  render() {
    return (
      <div>
        <button className="w-25 border">{this.state.displayHeader}</button>
        <div>
          <button onClick={this.handleClick}>7</button>
          <button onClick={this.handleClick}>8</button>
          <button onClick={this.handleClick}>9</button>
          <button onClick={this.pushtoCalculationStack}>+</button>
        </div>
        <div>
          <button onClick={this.handleClick}>4</button>
          <button onClick={this.handleClick}>5</button>
          <button onClick={this.handleClick}>6</button>
          <button onClick={this.pushtoCalculationStack}>-</button>
        </div>
        <div>
          <button onClick={this.handleClick}>1</button>
          <button onClick={this.handleClick}>2</button>
          <button onClick={this.handleClick}>3</button>
          <button onClick={this.pushtoCalculationStack}>*</button>
        </div>
        <div>
          <button onClick={this.handleClick}>.</button>
          <button onClick={this.handleClick}>0</button>
          <button onClick={this.toPostfix}>=</button>
          <button onClick={this.pushtoCalculationStack}>/</button>
        </div>
        <div>
          <button onClick={this.pushtoCalculationStack}>(</button>
          <button onClick={this.pushtoCalculationStack}>)</button>
          <button onClick={this.pushtoCalculationStack}>^</button>
          <button onClick={this.handleClear}>C</button>
        </div>
      </div>
    );
  }
}

export default Calculator;
