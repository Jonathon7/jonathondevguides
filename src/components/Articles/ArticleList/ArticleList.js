import React, { Component } from "react";
import ArticleListTemplate from "../ArticleListTemplate/ArticleListTemplate";
import styles from "./articlesList.module.scss";
import getArticles from "../AsyncFunctions/getArticles";
import propTypes from "prop-types";

class ArticleList extends Component {
  state = {
    articles: [] //list of all the article's titles and descriptions
  };

  componentDidMount() {
    this.getAllArticles();
  }

  getAllArticles = async () => {
    /**
     * @type {Array}
     * @function getArticles - fetches all the articles
     */
    let response = await getArticles("published");

    this.setState({
      articles: response
    });
  };

  render() {
    /**
     * @type {Component}
     */
    let allArticles;
    //maps through the articles array once the promise is evaluated
    if (this.state.articles) {
      allArticles = this.state.articles.map(article => {
        return (
          <ArticleListTemplate
            key={article.id}
            title={article.article_title}
            author={article.author}
            date={article.date_posted}
            description={article.article_description}
            src={article.article_image}
          />
        );
      });
    }
    return (
      <div>
        <div className={styles.articlesCont}>{allArticles}</div>
      </div>
    );
  }
}

ArticleList.propTypes = {
  articles: propTypes.array
};

export default ArticleList;
