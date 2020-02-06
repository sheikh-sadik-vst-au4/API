import React, { Component } from "react";

class input extends Component {
  state = {};
  render() {
    return (
      <input
        type="text"
        placeholder = {this.props.Placeholder}
        onChange={(event) => {
          this.props.getInputData(event.target.value);
        }}
      />
    );
  }
}

export default input;
