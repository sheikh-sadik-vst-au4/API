import ReactDom from "react-dom";
import React, { Component } from 'react';
//import React from 'react';
import Input from "./components/counter";


class Wrapper extends Component {
    state = {
        name: "",
        email : ""
    }
    render() {
        return (
            <div>
                <Input Placeholder = "name" getInputData={(data) => this.setState({ name: data })} />
                <Input Placeholder = "email" getInputData={(data) => this.setState({ email: data })}></Input>
            </div>
        )
    }
}

ReactDom.render(<Wrapper />, document.getElementById("root"));