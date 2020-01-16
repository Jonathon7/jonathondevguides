import React, { Component } from "react";
import ArticlesTemplate from "../ArticlesTemplate/ArticlesTemplate";
import axios from "axios";

export default class PublishedArticles extends Component {
  deleteArticle = id => {
    axios.delete(`/api/articles/${id}`).then(response => {
      this.props.getArticles(response.data);
    });
  };

  render() {
    let displayArticles = this.props.publishedArticles.map(article => {
      return (
        <ArticlesTemplate
          key={article.article_title}
          editArticle={() => this.props.editArticle(article)}
          title={article.article_title}
          date={article.date_posted}
          deleteArticle={() => this.deleteArticle(article.id)}
          active={article.id === this.props.articleId}
        />
      );
    });
    return <div>{displayArticles}</div>;
  }
}
