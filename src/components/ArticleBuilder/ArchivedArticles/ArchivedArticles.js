import React, { Component } from "react";
import styles from "./archivedArticles.module.scss";
import ShowArticleButtons from "./ShowArticleButtons/ShowArticleButtons";
import SavedArticles from "./SavedArticles/SavedArticles";
import PublishedArticles from "./PublishedArticles/PublishedArticles";
import getArticles from "../../Articles/AsyncFunctions/getArticles";
import SideToolbar from "./SideToolbar/SideToolbar";

export default class ArchivedArticles extends Component {
  state = {
    savedArticles: [],
    publishedArticles: [],
    showArticles: "saved" // determines which articles ar displayed, either saved or published
  };

  componentDidMount() {
    this.getArticles();
  }

  componentDidUpdate() {
    if (this.props.updatedArticle) {
      this.getArticles();
    }
  }

  getArticles = async () => {
    const savedArticles = await getArticles("saved");
    const publishedArticles = await getArticles("published");

    this.setState({
      savedArticles,
      publishedArticles
    });
  };

  showArticles = article => {
    this.setState({
      showArticles: article
    });
  };

  render() {
    return (
      <div className={styles.archivedArticlesCont}>
        <div className={styles.buttonsWithArticlesCont}>
          <SideToolbar
            collapseSidebar={this.props.collapseSidebar}
            toggleNewArticleModal={this.props.toggleNewArticleModal}
          />
          <ShowArticleButtons
            showArticles={this.showArticles}
            active={this.state.showArticles === "saved"}
          />
          {this.state.showArticles === "saved" ? (
            <SavedArticles
              savedArticles={this.state.savedArticles}
              editArticle={this.props.editArticle}
              showMoreOptions={this.showMoreOptions}
              articleId={this.props.articleId}
            />
          ) : (
            <PublishedArticles
              publishedArticles={this.state.publishedArticles}
              editArticle={this.props.editArticle}
              showMoreOptions={this.showMoreOptions}
              getArticles={this.getArticles}
              articleId={this.props.articleId}
            />
          )}
        </div>
      </div>
    );
  }
}
