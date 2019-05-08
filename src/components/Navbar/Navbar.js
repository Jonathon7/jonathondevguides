import React, { Component } from "react";
import { Link } from "react-router-dom";
import styles from "./navbar.module.scss";
import propTypes from "prop-types";
import getSearchResults from "./AsyncFunctions/getSearchResults";
import getUser from "./AsyncFunctions/getUser";

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
          <div className={styles.cont}>
            <div>/</div>
            <p className={styles.title}>Web Developer</p>
          </div>
        </div>
      </div>
    );
  }
}

Navbar.propTypes = {
  searchBar: propTypes.bool,
  searchInputValue: propTypes.string
};
