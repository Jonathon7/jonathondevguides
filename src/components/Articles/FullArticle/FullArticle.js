import React, { Component } from "react";
import styles from "./fullArticle.module.scss";
import getFullArticle from "../AsyncFunctions/getFullArticle";
import { convertFromRaw, EditorState } from "draft-js";
import Editor from "draft-js-plugins-editor";
import DisqusThread from "../DisqusThread/DisqusThread";
import createIframelyPlugin from "@jimmycode/draft-js-iframely-plugin";
import "@jimmycode/draft-js-iframely-plugin/lib/plugin.css";

const styleMap = {
  BOLD: {
    backgroundColor: "#f7f7f7",
    padding: "0px 6px",
    margin: "0px 1px",
    color: "#2196F3",
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

export default class FullArticle extends Component {
  state = {
    article: [], //Holds the data for the full article
    editorState: "", //Holds the data for the editor component to display
    plugins: [iframelyPlugin]
  };

  componentDidMount() {
    this.getArticle();
  }

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
   * @function getEditorState - parses the data into a usable format and sets it to state
   * @function getFullArticle - fetches the article that matches the passed in parameter
   * @param {string} this.props.match.params.id - the title of the article
   * @param {string} response[0].article_content - the article content passed into the getEditorState function
   */
  getArticle = async () => {
    let response = await getFullArticle(this.props.match.params.id);

    this.setState({
      article: response
    });

    this.getEditorState(response[0].article_content);
  };

  /**
   * @param {string} rawContent - the JSON string that contains the style format information for the article
   * @function JSON.parse - takes in the JSON string and parses it into an object
   * @function convertFromRaw - takes the JSON object and changes it to a usable state for the editorState component
   */
  getEditorState = rawContent => {
    const content = convertFromRaw(JSON.parse(rawContent));

    this.setState({
      editorState: EditorState.createWithContent(content)
    });
  };

  render() {
    return (
      <div className={styles.fullArticleCont}>
        {this.state.editorState ? (
          <Editor
            readOnly
            editorState={this.state.editorState}
            blockStyleFn={this.blockStyleFn}
            customStyleMap={styleMap}
            plugins={this.state.plugins}
          />
        ) : null}
        <br /> <br />
        <hr />
        {this.state.article[0] && (
          <DisqusThread
            style={{ paddingTop: "30px" }}
            id={this.state.article[0].id.toString()}
            title={this.state.article[0].article_title}
            path={this.props.location.pathname}
          />
        )}
        <br /> <br />
      </div>
    );
  }
}
