import React from "react";
import styles from "./buttons.module.scss";

export default function ArchiveButtons(props) {
  return (
    <div className={styles.buttonsCont}>
      <button
        onClick={() => {
          props.publishArticle("published");
        }}
      >
        Publish
      </button>
    </div>
  );
}
