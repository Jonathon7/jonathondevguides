import React, { Component } from "react";
import { Link } from "react-router-dom";
import styles from "./navbar.module.scss";
import propTypes from "prop-types";
import searchIcon from "../../images/search.png";
import SearchBar from "../SearchBar/SearchBar";
import getSearchResults from "./AsyncFunctions/getSearchResults";
import getUser from "./AsyncFunctions/getUser";
import WordSwitchAnimation from "./WordSwitchAnimation/WordSwitchAnimation";

export default class Navbar extends Component {
  state = {
    searchBar: false, // determines whether the search bar is rendered
    searchInputValue: "", // holds the characters typed into the search bar
    searchResults: [], // holds the results that matched the user's search value
    user: false // set to true if a user logs in
  };

  componentDidMount() {
    this.checkForUser();
  }

  componentDidUpdate() {
    console.log(this.props);
  }

  checkForUser = async () => {
    let user = await getUser();

    if (user.data.username) {
      this.setState({
        user: true
      });
    }
  };

  /**
   * @param {string} input the content for the search bar input field
   */
  searchInputValue = input => {
    this.setState({
      searchInputValue: input.target.value
    });
  };

  search = async () => {
    /**
     * @type {Array} the results that matched the user's input
     */
    let searchResults = await getSearchResults(this.state.searchInputValue);
    this.setState({
      searchResults
    });
  };

  /**
   * @param {Object} e - onmousedown event
   */
  toggleSearchBar = e => {
    e.preventDefault();
    this.setState({ searchBar: !this.state.searchBar });
  };

  render() {
    let displaySearchBar; // holds the jsx for what is displayed as the search bar

    /**
     * @param {boolean} this.state.searchBar - determines if the search bar is displayed or not
     * @prop {function} search - the function that is called every keypress
     * @prop {function} toggleSearchBar - the function called with an onclick event
     * @prop {Array} searchResults - passes the searchResults array from state to the SearchBar component
     */
    switch (this.state.searchBar) {
      case true:
        displaySearchBar = (
          <SearchBar
            searchInputValue={this.searchInputValue}
            search={this.search}
            toggleSearchBar={this.toggleSearchBar}
            searchResults={this.state.searchResults}
          />
        );
        break;
      case false:
        displaySearchBar = (
          <div className={styles.searchBar}>
            <img
              src={searchIcon}
              alt="Search Icon"
              onClick={e => {
                this.toggleSearchBar(e);
              }}
            />
          </div>
        );
        break;
      default:
        return null;
    }

    return (
      <div className={styles.navCont}>
        <div
          className={styles.linksCont}
          style={{ paddingRight: this.state.searchBar ? "96px" : null }}
        >
          {this.state.user ? (
            <Link to="/editor" className={styles.editorlink}>
              Editor
            </Link>
          ) : null}

          <Link to="/" className={styles.link}>
            Jonathon Flores
          </Link>
          <WordSwitchAnimation />
        </div>
        {/* {displaySearchBar} */}
      </div>
    );
  }
}

Navbar.propTypes = {
  searchBar: propTypes.bool,
  searchInputValue: propTypes.string
};
