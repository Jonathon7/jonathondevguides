import React, { Component } from "react";
import styles from "./searchBar.module.scss";
import propTypes from "prop-types";
import SearchResult from "./SearchResult/SearchResult";

export default class SearchBar extends Component {
  /**
   * @param {event} e onkeypress event
   */
  onEnterPress = e => {
    if (e.key === "Enter") {
      this.props.search();
    }
  };

  render() {
    /**
     * @type {Array} holds all the SearchResult components
     */
    let searchResults;
    searchResults = this.props.searchResults.map(article => {
      return (
        <SearchResult
          key={article.article_title}
          title={article.article_title}
          url={article.article_url}
        />
      );
    });
    return (
      <div className={styles.searchBarCont}>
        <input
          type="text"
          onChange={this.props.searchInputValue}
          onKeyPress={this.onEnterPress}
          placeholder="e.g. React"
          autoFocus={true}
        />
        <div
          className={styles.closeInputButton}
          onClick={this.props.toggleSearchBar}
        >
          X
        </div>
        <div className={styles.searchResultsCont}>{searchResults}</div>
      </div>
    );
  }
}

SearchBar.propTypes = {
  searchInputValue: propTypes.func.isRequired,
  toggleSearchBar: propTypes.func.isRequired
};
