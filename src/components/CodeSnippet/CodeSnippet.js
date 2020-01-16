import React, { Component } from "react";
import axios from "axios";
import renderHTML from "react-render-html";

export default class CodeSnippet extends Component {
  state = {
    html: null
  };

  componentDidMount() {
    axios.get(`/api/content/${this.props.match.params.id}`).then(response => {
      this.setState({
        html: response.data.html
      });
    });
  }

  render() {
    return <>{this.state.html && <div>{renderHTML(this.state.html)}</div>}</>;
  }
}
