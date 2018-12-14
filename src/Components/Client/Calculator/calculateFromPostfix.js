let calculateFromPostfix = (...postfixExpn) => {
  let outputArray = [];
  let num1, num2;
  for (let item of postfixExpn) {
    console.log(item);
    if (typeof item === "number") {
      outputArray.push(item);
    } else {
      switch (item) {
        case "^": {
          num1 = outputArray.pop();
          num2 = outputArray.pop();
          outputArray.push(Math.pow(num2, num1));
          break;
        }
        case "/": {
          num1 = outputArray.pop();
          num2 = outputArray.pop();
          outputArray.push(num2 / num1);
          break;
        }
        case "*": {
          num1 = outputArray.pop();
          num2 = outputArray.pop();
          outputArray.push(num2 * num1);
          break;
        }
        case "+": {
          num1 = outputArray.pop();
          num2 = outputArray.pop();
          outputArray.push(num2 + num1);
          break;
        }
        case "-": {
          num1 = outputArray.pop();
          num2 = outputArray.pop();
          outputArray.push(num2 - num1);
          break;
        }
        default:
          break;
      }
    }
  }
  return outputArray;
};
export default calculateFromPostfix;
