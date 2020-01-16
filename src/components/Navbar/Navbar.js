import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import styles from "./navbar.module.scss";
import axios from "axios";
import Login from "../Login/Login";
import Overlay from "../Overlay/Overlay";
import Notification from "../Notification/Notification";
import propTypes from "prop-types";
import getUser from "./AsyncFunctions/getUser";

export default class Navbar extends Component {
  state = {
    user: false, // set to true if a user logs in
    modal: false, // determines whether the login modal is displayed or not
    notificationText: "", // text to display on the notification
    animateNotification: false,
    redirect: false
  };

  componentDidMount() {
    this.checkForUser();
  }

  checkForUser = async () => {
    let user = await getUser();

    if (user.data.username) {
      this.setState({
        user: true
      });
    }
  };

  toggleModal = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  /**
   * @description - This function is passed as a prop to the Login Component to handle the login and signup functionality
   * @param {string} username - the username entered in the login form
   * @param {string} password - the password entered in the login form
   * @param {boolean} login - taken from state in the Login component. The value represents whether the user is loggin in or signing up
   */
  loginOrSignup = (username, password, login) => {
    if (login) {
      axios
        .post("/api/login", { username, password })
        .then(response => this.setState({ modal: false, user: true }))
        .catch(err => console.log(err));
    } else {
      axios
        .post("/api/signup", { username, password })
        .then(response => this.setState({ modal: false, user: true }))
        .catch(err => console.log(err));
    }
  };

  logout = () => {
    axios
      .delete("/api/logout")
      .then(res =>
        this.setState({ user: false, redirect: true }, () =>
          this.setState({ redirect: false })
        )
      )
      .catch(err => console.log(err));
  };

  promptLogin = () => {
    this.setState(
      {
        notificationText: "You need to login to use this feature"
      },
      () => {
        setTimeout(() => {
          this.setState({ animateNotification: true });
        }, 1800);

        setTimeout(() => {
          this.setState({ notificationText: "", animateNotification: false });
        }, 2000);
      }
    );
  };

  render() {
    return (
      <div className={styles.navCont}>
        <Link to="/" className={styles.logo}>
          Developer Guides
        </Link>

        <div className={styles.linksCont}>
          {this.state.user ? (
            <Link to="/editor" className={styles.editorLink}>
              Write
            </Link>
          ) : (
            <button className={styles.editorLink} onClick={this.promptLogin}>
              Write
            </button>
          )}

          {!this.state.user ? (
            <button onClick={this.toggleModal}>Login</button>
          ) : (
            <button onClick={this.logout}>Logout</button>
          )}
        </div>
        {this.state.modal && (
          <>
            <Login loginOrSignup={this.loginOrSignup} />
            <Overlay />
            <button className={styles.overlayButton} onClick={this.toggleModal}>
              X
            </button>
          </>
        )}
        {this.state.notificationText && (
          <Notification
            text={this.state.notificationText}
            animate={this.state.animateNotification}
          />
        )}
        {this.state.redirect && <Redirect to="/" />}
      </div>
    );
  }
}

Navbar.propTypes = {
  searchBar: propTypes.bool,
  searchInputValue: propTypes.string
};
