import React from "react";
import propTypes from "prop-types";
import styles from "./showArticleButtons.module.scss";

export default function ShowArticleButtons(props) {
  return (
    <div className={styles.showArticlesCont}>
      <p
        className={props.active ? styles.active : null}
        onClick={() => props.showArticles("saved")}
      >
        Saved
      </p>
      <p
        className={!props.active ? styles.active : null}
        onClick={() => props.showArticles("published")}
      >
        Published
      </p>
    </div>
  );
}

ShowArticleButtons.propTypes = {
  active: propTypes.bool.isRequired
};
