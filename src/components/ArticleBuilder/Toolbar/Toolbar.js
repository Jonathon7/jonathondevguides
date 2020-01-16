import React from "react";
import styles from "./toolbar.module.scss";
import EditorControls from "../EditorControls/EditorControls";
import ArchiveButtons from "../ArchivedArticles/ArchiveButtons/ArchiveButtons";

export default function Toolbar(props) {
  let displayArticleStatus;

  switch (props.isArticleSaved) {
    case "true": {
      displayArticleStatus = <div className={styles.saved}>Saved</div>;
      break;
    }
    case "false": {
      displayArticleStatus = <div className={styles.notSaved}>Not Saved</div>;
      break;
    }
    case "loading": {
      displayArticleStatus = (
        <div className={styles.spinner}>
          <div className={styles.bounce1} />
          <div className={styles.bounce2} />
          <div className={styles.bounce3} />
        </div>
      );
      break;
    }
  }

  return (
    <div className={styles.toolbarCont}>
      <EditorControls
        editorState={props.editorState}
        onToggle={props.onToggle}
      />
      <div className={styles.savedAnimationWithButton}>
        {displayArticleStatus}
        <ArchiveButtons
          toggleNewArticleModal={props.toggleNewArticleModal}
          publishArticle={props.publishArticle}
        />
      </div>
    </div>
  );
}
