import React, { Component } from "react";
import ArticlesTemplate from "../ArticlesTemplate/ArticlesTemplate";

export default class SavedArticles extends Component {
  render() {
    let displayArticles = this.props.savedArticles.map(article => {
      return (
        <ArticlesTemplate
          key={article.id}
          editArticle={() => this.props.editArticle(article)}
          title={article.article_title}
          date={article.date_posted}
          active={article.id === this.props.articleId}
        />
      );
    });
    return <div>{displayArticles}</div>;
  }
}
