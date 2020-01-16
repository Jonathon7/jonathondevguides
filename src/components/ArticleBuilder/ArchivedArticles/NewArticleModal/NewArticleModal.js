import React, { Component } from "react";
import styles from "./newArticleModal.scss";
import Notification from "../../../Notification/Notification";

export default class NewArticleModal extends Component {
  state = {
    title: "",
    date: "",
    description: "",
    notificationText: "",
    animateNotification: false,
    titleReq: false,
    dateReq: false,
    descriptionReq: false
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });

    this.setState({ titleReq: false, dateReq: false, descriptionReq: false });
  };

  createNewArticle = () => {
    if (!this.state.title) this.setState({ titleReq: true });
    if (!this.state.date) this.setState({ dateReq: true });
    if (!this.state.description) this.setState({ descriptionReq: true });

    if (!this.state.title || !this.state.date || !this.state.description) {
      return this.notify("All fields are required");
    }

    this.props.confirmArticle(
      this.state.title,
      this.state.date,
      this.state.description
    );
  };

  /**
   * @description - displays notification to user
   * @param {string} notificationText - the text to display to the user
   */
  notify = notificationText => {
    this.setState(
      {
        notificationText
      },
      () => {
        setTimeout(() => {
          this.setState({ animateNotification: true });
        }, 2200);

        setTimeout(() => {
          this.setState({ notificationText: "", animateNotification: false });
        }, 2400);
      }
    );
  };

  render() {
    return (
      <>
        <div className={styles.modal}>
          <p>Title</p>
          <input
            type="text"
            name="title"
            onChange={this.handleChange}
            style={{ borderColor: this.state.titleReq && "#ff5252" }}
          />
          <p>Date</p>
          <input
            type="text"
            name="date"
            onChange={this.handleChange}
            style={{ borderColor: this.state.dateReq && "#ff5252" }}
          />
          <p>Description</p>
          <input
            type="text"
            name="description"
            onChange={this.handleChange}
            style={{
              borderColor: this.state.descriptionReq && "#ff5252"
            }}
          />
          <div className={styles.buttonCont}>
            <button
              onClick={this.props.createNewArticle}
              onClick={this.createNewArticle}
            >
              Confirm
            </button>
            <button onClick={this.props.toggleNewArticleModal}>Cancel</button>
          </div>
        </div>
        <div className={styles.overlay} />
        {
          <Notification
            text={this.state.notificationText}
            animate={this.state.animateNotification}
          />
        }
      </>
    );
  }
}
