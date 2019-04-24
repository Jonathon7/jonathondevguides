import React, { Component } from "react";
import styles from "./articlesTemplate.module.scss";
import icon from "../../../../images/3-dots.png";
import MoreOptions from "../MoreOptions/MoreOptions";
import propTypes from "prop-types";

export default class ArticlesTemplate extends Component {
  state = {
    showOptions: false
  };

  showOptions = () => {
    this.setState({
      showOptions: true
    });
  };

  render() {
    return (
      <div
        className={styles.articleTemplateCont}
        onClick={this.props.editArticle}
      >
        <h3>{this.props.title}</h3>
        <p>{this.props.date}</p>
        <img
          src={icon}
          alt="More Options"
          className={styles.moreOptions}
          onClick={e => {
            e.stopPropagation();
            this.showOptions();
          }}
        />
        {this.state.showOptions && (
          <MoreOptions deleteArticle={this.props.deleteArticle} />
        )}
      </div>
    );
  }
}

ArticlesTemplate.propTypes = {
  title: propTypes.string.isRequired,
  date: propTypes.string.isRequired
};
