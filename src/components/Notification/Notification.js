import React from "react";
import styles from "./notification.module.scss";

export default function Notification(props) {
  return (
    <div
      className={
        props.animate ? styles.notificationContFade : styles.notificationCont
      }
    >
      {props.text}
    </div>
  );
}
