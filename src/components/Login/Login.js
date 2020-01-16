import React, { Component } from "react";
import styles from "./login.module.scss";

export default class Login extends Component {
  state = {
    username: "",
    password: "",
    login: true
  };

  handleChange = val => {
    this.setState({
      [val.target.name]: val.target.value
    });
  };

  toggleLoginSignup = () => {
    this.setState({
      login: !this.state.login
    });
  };

  render() {
    return (
      <div
        className={styles.loginCont}
        style={{
          backgroundColor: this.state.login ? "#2196f3" : "#ED9B62",
          transition: ".2s"
        }}
      >
        <div className={styles.buttonsCont}>
          <button
            style={{
              backgroundColor: !this.state.login && "#fff",
              color: !this.state.login && "#000",
              boxShadow:
                !this.state.login && "inset -2px 0px 1px 0px rgba(0,0,0,0.39)",
              transition: ".2s"
            }}
            onClick={this.toggleLoginSignup}
          >
            Login
          </button>
          <button
            style={{
              backgroundColor: this.state.login ? "#fff" : "#ED9B62",
              color: this.state.login && "#000",
              boxShadow:
                this.state.login && "inset 2px 0px 1px 0px rgba(0,0,0,0.39)",
              transition: ".2s"
            }}
            onClick={this.toggleLoginSignup}
          >
            Signup
          </button>
        </div>
        <div className={styles.inputFields}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={this.handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={this.handleChange}
          />
          <button
            onClick={() =>
              this.props.loginOrSignup(
                this.state.username,
                this.state.password,
                this.state.login
              )
            }
          >
            {this.state.login ? "Login" : "Signup"}
          </button>
        </div>
      </div>
    );
  }
}
