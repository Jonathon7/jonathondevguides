import React, { Component } from "react";
import styles from "./overlay.module.scss";

export default class Overlay extends Component {
  render() {
    return <div className={styles.overlayCont}></div>;
  }
}
