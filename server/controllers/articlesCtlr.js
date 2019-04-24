const getArticles = (req, res) => {
  const db = req.app.get("db");

  db.get_articles([req.params.status])
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(500);
    });
};

const getArticle = (req, res) => {
  const db = req.app.get("db");
  db.get_article([req.params.id])
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(500);
    });
};

const postArticle = async (req, res) => {
  const db = req.app.get("db");
  const existingArticle = await db.search_existing_article([req.body.id]);

  if (existingArticle[0]) {
    let updatedArticle = db.update_article([
      req.body.title,
      req.body.date,
      req.body.description,
      req.body.content,
      req.body.id,
      req.body.status
    ]);
    res.status(200).json(updatedArticle);
  } else {
    db.post_article([
      req.body.title,
      req.body.date,
      req.body.description,
      req.body.content,
      req.body.status
    ]);
  }
};

getSearchResults = (req, res) => {
  const db = req.app.get("db");

  db.search_article(["%" + req.params.words + "%"])
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      console.log(err);
    });
};

const deleteArticle = (req, res) => {
  const db = req.app.get("db");

  db.delete_article([req.params.id])
    .then(res => {
      res.sendStatus(200);
    })
    .catch(err => {
      res.status(500).json(err);
    });
};

module.exports = {
  getArticles,
  getArticle,
  postArticle,
  getSearchResults,
  deleteArticle
};
