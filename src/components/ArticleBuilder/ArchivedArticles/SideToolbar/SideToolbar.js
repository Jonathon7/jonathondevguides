import React from "react";
import collapse from "../../../../images/collapse-2.png";
import styles from "./sideToolbar.module.scss";

export default function SideToolbar(props) {
  return (
    <div className={styles.sideToolbarCont}>
      <img
        src={collapse}
        alt="collpase sidebar icon"
        onClick={props.collapseSidebar}
      />
      <button onClick={props.toggleNewArticleModal}>New Article</button>
    </div>
  );
}
