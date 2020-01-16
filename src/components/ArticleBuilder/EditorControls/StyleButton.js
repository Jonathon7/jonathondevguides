import React, { Component } from "react";
import styles from "./styleButton.module.scss";
import propTypes from "prop-types";

export default class StyleButton extends Component {
  /**
   * @param {event} onMouseDown - event to change content styles
   * @function onToggle - function passed as a prop to the EditorControls component
   * @param {string} this.props.style - type of html element to toggle to
   */
  onToggle = e => {
    e.preventDefault();
    this.props.onToggle(this.props.style);
  };

  render() {
    /**
     * @prop {string} label - for the block type
     */
    return (
      <div
        className={this.props.active ? styles.active : styles.button}
        onClick={this.onToggle}
      >
        {this.props.label}
      </div>
    );
  }
}

StyleButton.propTypes = {
  label: propTypes.string
};
