import React from "react";
import propTypes from "prop-types";
import styles from "./searchResult.module.scss";

export default function SearchResult(props) {
  return (
    <div className={styles.searchResultsCont}>
      <a href={props.url}>
        <div>{props.title}</div>
      </a>
    </div>
  );
}

SearchResult.propTypes = {
  url: propTypes.string.isRequired,
  title: propTypes.string.isRequired
};
