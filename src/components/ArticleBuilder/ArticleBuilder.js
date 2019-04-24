import React, { Component } from "react";
import "./articleBuilder.css";
import styles from "./articleBuilder.module.scss";
import ArchivedArticles from "./ArchivedArticles/ArchivedArticles";
import BlockStyleControls from "./Editor/EditorControls";
import postArticle from "./AsyncFunctions/postArticle";
import Editor from "draft-js-plugins-editor";
import { EditorState, RichUtils, convertToRaw, convertFromRaw } from "draft-js";
import getUser from "../Navbar/AsyncFunctions/getUser";

import createIframelyPlugin from "@jimmycode/draft-js-iframely-plugin";
import "@jimmycode/draft-js-iframely-plugin/lib/plugin.css";

const styleMap = {
  BOLD: {
    backgroundColor: "#f7f7f7",
    padding: "0px 6px",
    margin: "0px 1px",
    color: "#e36208",
    borderRadius: "5px"
  }
};

const iframelyPlugin = createIframelyPlugin({
  options: {
    apiKey: "7c5dc608ba30e02efb5537",
    handleOnReturn: true,
    handleOnPaste: true
  }
});

export default class ArticleBuilder extends Component {
  constructor() {
    super();
    this.state = {
      editorState: EditorState.createEmpty(),
      plugins: [iframelyPlugin],
      user: false,
      articleId: null, // stores the id of the currently selected article
      updatedArticle: false,
      status: null
    };

    this.editor = React.createRef();
    this.autoSaveArticles = setInterval(
      () => this.postArticle(this.state.status),
      5000
    );
  }

  componentWillUnmount() {
    clearInterval(this.autoSaveArticles);
  }

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
   * @function convertToRaw - changes the format of the editorState object to a storable format
   * @function postArticle - makes post request to add the article to the database
   * @param {string} status - the status of the post, either saved or published
   */
  postArticle = async status => {
    /**
     * @type {string} - holds the style format for the article changed from a JSON object to a string
     */
    let content = convertToRaw(this.state.editorState.getCurrentContent());

    if (
      content.blocks[0].type !== "header-one" ||
      content.blocks[1].type !== "header-two" ||
      content.blocks[2].type !== "paragraph"
    ) {
      return;
    }

    if (status === "published") {
      this.setState({
        status: "published"
      });
    }

    let article = await postArticle({
      title: content.blocks[0].text,
      date: content.blocks[1].text,
      description: content.blocks[2].text,
      content: JSON.stringify(content),
      id: this.state.articleId,
      status: status || this.state.status
    });

    if (article.data[0]) {
      this.setState(
        {
          updatedArticle: true
        },
        () => {
          setTimeout(() => this.setState({ updatedArticle: false }), 2000);
        }
      );
    }
  };

  /**
   * @param {Object} article - passed from the SavedArticle component, holds all the article data
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
      <div className={styles.articleBuilderCont}>
        <BlockStyleControls
          editorState={this.state.editorState}
          onToggle={this.toggleBlockType}
        />
        <div className={styles.inputCont}>
          <Editor
            blockStyleFn={this.blockStyleFn}
            customStyleMap={styleMap}
            editorState={this.state.editorState}
            onChange={this.onChange}
            handleKeyCommand={this.handleKeyCommand}
            spellCheck={true}
            plugins={this.state.plugins}
            ref={this.editor}
          />
        </div>
        <ArchivedArticles
          postArticle={this.postArticle}
          editArticle={this.editArticle}
          updatedArticle={this.state.updatedArticle}
        />
      </div>
    );
  }
}
