import React, { Component } from "react";
import styles from "./archivedArticles.module.scss";
import ArchiveButtons from "./ArchiveButtons/ArchiveButtons";
import ShowArticleButtons from "./ShowArticleButtons/ShowArticleButtons";
import SavedArticles from "./SavedArticles/SavedArticles";
import PublishedArticles from "./PublishedArticles/PublishedArticles";
import ConfirmationModal from "./ConfirmationModal/ConfirmationModal";
import getArticles from "../../Articles/AsyncFunctions/getArticles";

export default class ArchivedArticles extends Component {
  state = {
    savedArticles: [],
    publishedArticles: [],
    showArticles: "saved",
    displayConfirmation: false // determines if the confirmation modal is displayed
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
    let savedArticles = await getArticles("saved");
    let publishedArticles = await getArticles("published");

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

  showConfirmationModal = () => {
    this.setState({
      displayConfirmation: true
    });
  };

  render() {
    return (
      <div className={styles.archivedArticlesCont}>
        <ArchiveButtons
          postArticle={this.props.postArticle}
          getArticles={this.getArticles}
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
          />
        ) : (
          <PublishedArticles
            publishedArticles={this.state.publishedArticles}
            editArticle={this.props.editArticle}
            showMoreOptions={this.showMoreOptions}
            getArticles={this.getArticles}
          />
        )}
        {this.state.displayConfirmation && <ConfirmationModal />}
      </div>
    );
  }
}
