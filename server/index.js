require("dotenv").config();
const express = require("express");
const { json } = require("body-parser");
const massive = require("massive");
const session = require("express-session");
const path = require("path");
const PORT = 3002;
const {
  getArticles,
  getArticle,
  postArticle,
  getSearchResults,
  deleteArticle
} = require("./controllers/articlesCtlr");
const { loginUser, getUser } = require("./controllers/loginCtlr");
const app = express();

app.use(json());

app.use(express.static(`${__dirname}/../dist`));

massive(process.env.CONNECTION_STRING)
  .then(db => app.set("db", db), console.log("Database Connected"))
  .catch(err => {
    console.log(err);
  });

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7 * 2 // two weeks
    }
  })
);

app.get("/api/articles/:status", getArticles);
app.get("/api/article/:id", getArticle);
app.get("/api/articles/search/results/:words", getSearchResults);
app.post("/api/article/post", postArticle);
app.delete("/api/articles/:id", deleteArticle);

app.get("/api/user", getUser);
app.post("/api/login", loginUser);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
