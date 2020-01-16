import React, { Component } from "react";
import "./articleBuilder.css";
import styles from "./articleBuilder.module.scss";
import ArchivedArticles from "./ArchivedArticles/ArchivedArticles";
import saveArticle from "./AsyncFunctions/saveArticle";
import createArticle from "./AsyncFunctions/createArticle";
import Editor from "draft-js-plugins-editor";
import {
  EditorState,
  RichUtils,
  convertToRaw,
  convertFromRaw,
  ContentBlock,
  ContentState,
  genKey
} from "draft-js";
import getUser from "../Navbar/AsyncFunctions/getUser";
import NewArticleModal from "./ArchivedArticles/NewArticleModal/NewArticleModal";
import Toolbar from "./Toolbar/Toolbar";
import collapse from "../../images/collapse-2.png";
import Notification from "../Notification/Notification";

import createIframelyPlugin from "@jimmycode/draft-js-iframely-plugin";
import "@jimmycode/draft-js-iframely-plugin/lib/plugin.css";

const styleMap = {
  BOLD: {
    backgroundColor: "#f7f7f7",
    padding: "0px 6px",
    margin: "0px 1px",
    color: "#2196f3",
    borderRadius: "5px",
    fontFamily: "Inconsolata"
  }
};

const iframelyPlugin = createIframelyPlugin({
  options: {
    apiKey: "7c5dc608ba30e02efb5537",
    handleOnReturn: true,
    handleOnPaste: true
  }
});

let timeout = null;

export default class ArticleBuilder extends Component {
  state = {
    editorState: EditorState.createEmpty(),
    plugins: [iframelyPlugin],
    user: false, // stores the current user session
    articleId: null, // stores the id of the currently selected article
    isArticleSaved: "true", // hold the status of the autsaved article
    newArticle: false, // determines when the new article modal is displayed
    showSidebar: true,
    notificationText: "", // text to display on the notification
    animateNotification: false,
    updatedArticle: false
  };

  checkForUser = async () => {
    let user = await getUser();

    if (user.data.username) {
      this.setState({
        user: true
      });
    } else {
      this.props.history.push("/");
    }
  };

  /**
   * @param {string} blockType - type of block to toggle to
   */
  toggleBlockType = blockType => {
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
  };

  /**
   * @param {Object} contentBlock - holds the data for the block
   * @description - function applies custom css to certain block types
   * @returns {string} - references classes in stylesheet
   */
  blockStyleFn = contentBlock => {
    /**
     * @type {string} - holds the type of block the user clicked on
     */
    const type = contentBlock.getType();
    if (type === "header-one") {
      return "title";
    } else if (type === "header-two") {
      return "date";
    } else if (type === "header-three") {
      return "header";
    } else if (type === "paragraph") {
      return "paragraph";
    }
  };

  /**
   * @description - AUTO SAVE FEATURE - saves the article 500ms after the user stopped typing,
   * checks to see if the article id was returned, if it was then isArticleSaved
   * is set to true which changes the saved status icon from unsaved to saved
   * @function saveArticle - the function that executes the put request to update
   * the article in the db
   */
  saveArticleAndUpdateStatus = () => {
    clearTimeout(timeout);

    this.setStatusToUnsaved();

    timeout = setTimeout(async () => {
      /**
       * @type {Object} - hold the article's id that is returned from the function
       */
      const article = await this.saveArticle("saved");

      if (!article) {
        return this.setState({ isArticleSaved: "false" });
      }

      this.setState(
        {
          isArticleSaved: "true",
          updatedArticle: true
        },
        () => setTimeout(() => this.setState({ updatedArticle: false }), 100)
      );
    }, 500);
  };

  /**
   * @description - if the isArticleSaved status is true when the user starts typing in the editor, then
   * it is set to false which changes the status icon from saved to unsaved
   */
  setStatusToUnsaved = () => {
    if (this.state.isArticleSaved !== "true") return;

    this.setState({ isArticleSaved: "loading" });
  };

  /**
   * @description - gets the current article information in the correct format and calls the saveArticle function to execute the put request and updates the article by saving it or publishing it
   * @param {String} savedOrPublished - the auto save or the published option if the user clicks the publish button
   * @function convertToRaw - changes the format of the editorState object to a storable format
   * @function saveArticle - FUNCTION IS IMPORTED FROM ANOTHER MODULE - makes put request to update the article in the database, accepts an object as a paramater
   * @returns {Object} - the updated article's id
   */
  saveArticle = async savedOrPublished => {
    /**
     * @type {string} - holds the style format for the article changed from a JSON object to a string
     */
    const content = convertToRaw(this.state.editorState.getCurrentContent());
    if (
      content.blocks[0].type !== "header-one" ||
      content.blocks[1].type !== "header-two" ||
      content.blocks[2].type !== "paragraph"
    ) {
      return;
    }

    const article = await saveArticle({
      title: content.blocks[0].text,
      date: content.blocks[1].text,
      description: content.blocks[2].text,
      content: JSON.stringify(content),
      id: this.state.articleId,
      status: savedOrPublished
    });

    if (article.data.message === "This Article is already published") {
      this.notify("This article is already published");
    } else if (
      article.data.message ===
      "This article has been changed and needs to be re-published to be seen by the public"
    ) {
      this.notify(
        "This article has been changed and needs to be re-published to be seen by the public"
      );
    } else if (savedOrPublished === "published") {
      this.notify("Your article has been published!");
    }

    return article;
  };

  /**
   * @param {Object} article - passed to the SavedArticle component, holds all the article data
   * @description - parses the raw data from a JSON string into an object and sets it to state
   */
  editArticle = article => {
    const content = convertFromRaw(JSON.parse(article.article_content));
    this.setState({
      editorState: EditorState.createWithContent(content),
      articleId: article.id,
      status: article.article_status
    });
  };

  toggleNewArticleModal = () => {
    this.setState({
      newArticle: !this.state.newArticle
    });
  };

  /**
   * @description - creates draft js content blocks with the title, date, and description from the new artcile modal inputs, and notifies the user
   * @param {String} title
   * @param {String} date
   * @param {String} description
   */
  confirmArticle = (title, date, description) => {
    const contentBlocks = [
      {
        text: title,
        type: "header-one"
      },
      {
        text: date,
        type: "header-two"
      },
      {
        text: description,
        type: "paragraph"
      }
    ];

    const contentBlocksArray = contentBlocks.map(block => {
      return new ContentBlock({
        key: genKey(),
        type: block.type,
        text: block.text
      });
    });

    this.setState(
      {
        editorState: EditorState.createWithContent(
          ContentState.createFromBlockArray(contentBlocksArray)
        ),
        newArticle: false
      },
      () => {
        this.createArticle(title, date, description);
        this.notify("New article has been created");
      }
    );
  };

  createArticle = (title, date, description) => {
    const editorContent = convertToRaw(
      this.state.editorState.getCurrentContent()
    );

    const newArticleContent = {
      title,
      date,
      description,
      content: JSON.stringify(editorContent)
    };

    const articleId = createArticle(newArticleContent);

    this.setState({
      articleId
    });
  };

  collapseSidebar = () => {
    this.setState({
      showSidebar: !this.state.showSidebar
    });
  };

  /**
   * @description - displays notification to user and sets the updatedArticle to true which updates the article list in the side menu
   * @param {string} notificationText - the text to display to the user
   */
  notify = notificationText => {
    this.setState(
      {
        notificationText,
        updatedArticle: true
      },
      () => {
        setTimeout(() => {
          this.setState({ animateNotification: true, updatedArticle: false });
        }, 2200);

        setTimeout(() => {
          this.setState({ notificationText: "", animateNotification: false });
        }, 2400);
      }
    );
  };

  /**
   * @param {string} command - the key command the user toggled
   * @param {Object} editorState - the editorState information to apply the style
   */
  handleKeyCommand(command, editorState) {
    /**
     * @type {Object} used to check if the user toggled a valid key command
     */
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return "handled";
    }
    return "not-handled";
  }

  /**
   * @param {Object} editorState - the style format information for the Editor component
   */
  onChange = editorState => {
    this.setState({
      editorState
    });
  };

  render() {
    return (
      <div
        className={styles.articleBuilderCont}
        style={{
          height: this.state.newArticle && "calc(100vh - 60px)",
          overflowY: this.state.newArticle && "hidden"
        }}
      >
        <div
          className={styles.editorContWithToolbar}
          /**
           * @description - the editor is centered in the space between the sidebar and the rest of the page
           * if the sidebar is rendered, if it is not then it is centered on the page
           */
          style={{
            marginLeft: this.state.showSidebar
              ? "calc((50vw - 520px) / 2)"
              : "calc(50vw / 2)"
          }}
        >
          <Toolbar
            editorState={this.state.editorState}
            onToggle={this.toggleBlockType}
            saveArticle={this.saveArticle}
            isArticleSaved={this.state.isArticleSaved}
            publishArticle={this.saveArticle}
          />
          <div className={styles.editorCont}>
            <Editor
              blockStyleFn={this.blockStyleFn}
              customStyleMap={styleMap}
              editorState={this.state.editorState}
              onChange={this.onChange}
              handleKeyCommand={this.handleKeyCommand}
              plugins={this.state.plugins}
              keyBindingFn={this.saveArticleAndUpdateStatus}
              readOnly={this.state.articleId ? false : true}
            />
          </div>
        </div>
        {this.state.showSidebar ? (
          <ArchivedArticles
            collapseSidebar={this.collapseSidebar}
            editArticle={this.editArticle}
            updatedArticle={this.state.updatedArticle}
            toggleNewArticleModal={this.toggleNewArticleModal}
            articleId={this.state.articleId}
          />
        ) : (
          <>
            <div className={styles.collapseSidebarIcons}>
              <img src={collapse} onClick={this.collapseSidebar} />
            </div>
          </>
        )}
        {this.state.newArticle && (
          <NewArticleModal
            createNewArticle={this.createNewArticle}
            toggleNewArticleModal={this.toggleNewArticleModal}
            confirmArticle={this.confirmArticle}
          />
        )}
        {this.state.notificationText && (
          <Notification
            text={this.state.notificationText}
            animate={this.state.animateNotification}
          />
        )}
      </div>
    );
  }
}
