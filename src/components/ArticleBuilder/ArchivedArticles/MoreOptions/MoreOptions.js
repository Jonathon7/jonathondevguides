import React from "react";
import styles from "./moreOptions.module.scss";

export default function MoreOptions(props) {
  return (
    <div
      className={styles.moreOptionsCont}
      onClick={e => {
        e.stopPropagation();
        props.deleteArticle();
      }}
    >
      <p>Delete</p>
    </div>
  );
}
