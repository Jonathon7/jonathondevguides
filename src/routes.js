import React from "react";
import { Route, Switch } from "react-router-dom";
import ArticleList from "./components/Articles/ArticleList/ArticleList";
import FullArticle from "./components/Articles/FullArticle/FullArticle";
import ArticleBuilder from "./components/ArticleBuilder/ArticleBuilder";
import CodeSnippet from "./components/CodeSnippet/CodeSnippet";

export default (
  <Switch>
    <Route exact path="/" component={ArticleList} />
    <Route path="/article/:id" component={FullArticle} />
    <Route path="/editor" component={ArticleBuilder} />
    <Route path="/content/:id" component={CodeSnippet} />
  </Switch>
);
