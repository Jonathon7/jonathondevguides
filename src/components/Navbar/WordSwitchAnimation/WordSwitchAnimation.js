import React, { Component } from "react";
import styles from "./wordSwitchAnimation.module.scss";

export default class WordSwitchAnimation extends Component {
  constructor() {
    super();
    this.state = {
      titles: ["Web Developer", "Something Else", "hello", "sup"], // list of titles to toggle between
      index: 0, // index that determines which title is displayed out of the titles array
      switchWord: false, // determines which css class is applied for the animation
      displayNothing: false
    };

    // this.wordSwitchInterval = setInterval(this.changeTitle, 4000);
  }

  // componentWillUnmount() {
  //   clearInterval(this.wordSwitchInterval);
  // }

  /**
   * @description - function runs every four seconds to toggle the animation in the navbar
   */
  changeTitle = () => {
    if (this.state.index < this.state.titles.length - 1) {
      this.setState({ switchWord: true }, () => {
        setTimeout(() => {
          this.setState(
            { displayNothing: true, index: this.state.index + 1 },
            () => {
              this.setState({ displayNothing: false, switchWord: false });
            }
          );
        }, 300);
      });
    } else {
      this.setState({ switchWord: true }, () => {
        setTimeout(() => {
          this.setState({ displayNothing: true, index: 0 }, () => {
            this.setState({ displayNothing: false, switchWord: false });
          });
        }, 300);
      });
    }
  };

  render() {
    return (
      <div className={styles.cont}>
        <div>/</div>
        <p className={styles.title}>Web Developer</p>
      </div>
    );
  }
}
