const bcrypt = require("bcryptjs");

const loginUser = async (req, res) => {
  const db = req.app.get("db");

  const getUser = await db.get_user([req.body.username]);
  const user = getUser[0];

  const isAuthenticated = bcrypt.compareSync(req.body.password, user.password);

  if (isAuthenticated) {
    req.session.user = {
      username: req.body.username
    };
  }

  res.sendStatus(200);
};

getUser = (req, res) => {
  res.status(200).json(req.session.user);
};

const signupUser = async (req, res) => {
  const db = req.app.get("db");

  const pass = await bcrypt.hash(req.body.password, 12);
  db.add_user([req.body.username, pass]);
};

module.exports = {
  loginUser,
  signupUser,
  getUser
};
