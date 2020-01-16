require("dotenv").config();
const express = require("express");
const { json } = require("body-parser");
const massive = require("massive");
const session = require("express-session");
const path = require("path");
const cors = require("cors");
const PORT = 3003;
const {
  getArticles,
  getArticle,
  saveArticle,
  createArticle,
  publishArticle,
  deleteArticle
} = require("./controllers/articlesCtlr");
const { loginUser, getUser, logoutUser } = require("./controllers/loginCtlr");
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
app.put("/api/article/save", saveArticle);
app.post("/api/article/create", createArticle);
app.post("/api/article/publish", publishArticle);
app.delete("/api/articles/:id", deleteArticle);

app.get("/api/user", getUser);
app.post("/api/login", loginUser);
app.delete("/api/logout", logoutUser);

// enpoints for code snippet upload
app.post("/api/upload", (req, res) => {
  const db = req.app.get("db");

  db.upload([req.body.html, req.body.text]).then(response => {
    res.status(200).json("Successful request");
  });
});

app.get("/api/content/:id", (req, res) => {
  const db = req.app.get("db");

  db.get_code_snippet(req.params.id).then(response => {
    res.status(200).json(response[0]);
  });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
