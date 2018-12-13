import React, { Component } from "react";

class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStack: [],
      calculationStack: [],
      displayHeader: []
    };
  }
  handleCalculation = () => {};
  pushtoCalculationStack = e => {
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
  };

  handleClick = e => {
    this.setState({
      currentStack: this.state.currentStack.concat(e.target.innerHTML),
      displayHeader: this.state.displayHeader.concat(e.target.innerHTML)
    });
  };
  //   handleInput = e => {
  //     this.setState({
  //       currentStack: this.state.currentStack.concat(
  //         e.target.value[e.target.value.length - 1]
  //       ),
  //       displayHeader: this.state.displayHeader.concat(
  //         e.target.value[e.target.value.length - 1]
  //       )
  //     });
  //     //   if (e.target.input==="+"){

  //     //   }
  //   };
  render() {
    return (
      <div>
        <h1>
          {
            /* {this.state.calculationStack.length === 0
            ? this.state.currentStack
            : this.state.calculationStack} */
            this.state.displayHeader
          }
        </h1>
        <div>
          <button value="7" onClick={this.handleClick}>
            7
          </button>
          <button value="8" onClick={this.handleClick}>
            8
          </button>
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
          <button>.</button>
          <button onClick={this.handleClick}>0</button>
          <button>=</button>
          <button onClick={this.pushtoCalculationStack}>/</button>
        </div>
      </div>
    );
  }
}

export default Calculator;
