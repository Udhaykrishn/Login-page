import { findUsers } from "../models/user.model.js";

const getLogin = (req, res) => {
  const date = new Date().toLocaleTimeString();
  if (req.session.user) {
    res.redirect("/home");
  }
  res.render("login", { error: null, time: date });
};

const postLogin = (req, res) => {
  const { username, password } = req.body;

  if (username === "" || password === "") {
    res.render("login", {
      error: "Username and password should be need",
      time: null,
    });
  } else if (password.length < 6) {
    res.render("login", {
      error: "Password should be greater than 6 characters",
      time: null,
    });
  }

  const user = findUsers(req.body);

  if (user) {
    req.session.user = user;
    res.redirect("/home");
  } else {
    res.render("login", { error: "Invalid credentials found", time: null });
  }
};

const postLogout = (req, res) => {
  req.session.destroy((err) => {
    res.clearCookie("connect.sid");
    if (err) return res.redirect("/home");
    res.redirect("/login");
  });
};

const home = (req, res) => {
  res.render("home", { username: req.session.user.username });
};

const getIndex = (req, res) => {
  res.redirect("home");
};

const PageNotFound = (req, res) => {
  res.render("notfound");
};

const getContact = (req, res) => {
  res.send("This is contact page");
};

export {
  getLogin,
  postLogin,
  postLogout,
  home,
  getIndex,
  PageNotFound,
  getContact,
};
