import React, { Component } from "react";
import axios from "axios";

export default class Login extends Component {
  state = {
    username: "",
    password: ""
  };

  handleChange = val => {
    this.setState({
      [val.target.name]: val.target.value
    });
  };

  handleClick = async () => {
    const { username, password } = this.state;
    await axios.post("/api/login", { username, password });

    this.props.history.push("/");
  };

  render() {
    return (
      <div>
        <input type="text" name="username" onChange={this.handleChange} />
        <input type="password" name="password" onChange={this.handleChange} />
        <button onClick={this.handleClick}>Login</button>
      </div>
    );
  }
}
