import React, { Component } from "react";

class App extends Component {
  render() {
    return (
      <div>
        <div className="main-content transform">{this.props.children}</div>
      </div>
    );
  }
}
// App.propTypes = {
//   children: React.propTypes.component.isRequired
// };
export default App;
