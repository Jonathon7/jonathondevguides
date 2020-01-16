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

const saveArticle = async (req, res) => {
  const db = req.app.get("db");
  const existingArticle = await db.search_existing_article([req.body.id]);

  if (
    existingArticle[0].article_status === "published" &&
    req.body.status === "published"
  ) {
    return res
      .status(200)
      .json({ message: "This Article is already published" });
  } else {
    const updatedArticle = await db.update_article([
      req.body.title,
      req.body.date,
      req.body.description,
      req.body.content,
      req.body.id,
      req.body.status
    ]);
    if (
      existingArticle[0].article_status === "published" &&
      updatedArticle[0].article_status === "saved"
    ) {
      updatedArticle[0].message =
        "This article has been changed and needs to be re-published to be seen by the public";
    }

    res.status(200).json(updatedArticle[0]);
  }
};

const createArticle = async (req, res) => {
  const db = req.app.get("db");

  const { title, date, description, content } = req.body;

  const id = await db.create_article([
    title,
    date,
    description,
    content,
    req.session.user.username
  ]);

  res.status(200).json(id[0].id);
};

const publishArticle = async (req, res) => {
  const db = req.app.get("db");

  const existingArticle = await db.search_existing_article([req.body.id]);

  if (existingArticle) return;

  db.post_article([
    req.body.title,
    req.body.date,
    req.body.description,
    req.body.content,
    req.body.status
  ]).then(response => {
    res.status(200).json(response[0]);
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
  deleteArticle,
  saveArticle,
  createArticle,
  publishArticle
};
