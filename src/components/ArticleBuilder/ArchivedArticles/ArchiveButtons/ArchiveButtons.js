import React from "react";
import styles from "./buttons.module.scss";

export default function ArchiveButtons(props) {
  return (
    <div className={styles.buttonsCont}>
      <button
        onClick={() => {
          props.postArticle("saved");
        }}
      >
        Save
      </button>
      <button
        onClick={() => {
          props.postArticle("published");
        }}
      >
        Publish
      </button>
    </div>
  );
}
