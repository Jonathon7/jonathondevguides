import React from "react";
import styles from "./article.module.scss";
import propTypes from "prop-types";
import { Link } from "react-router-dom";

export default function ArticleListTemplate(props) {
  return (
    <Link
      to={{
        pathname: `/article/${props.title}`,
        state: { id: props.title }
      }}
      className={styles.link}
    >
      <div className={styles.articleCont}>
        <div>
          <h1>{props.title}</h1>
          <p>{props.date}</p>
          <h3>{props.description}</h3>
        </div>
      </div>
    </Link>
  );
}

ArticleListTemplate.propTypes = {
  title: propTypes.string.isRequired,
  date: propTypes.string.isRequired,
  description: propTypes.string.isRequired
};
