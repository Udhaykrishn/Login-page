import { findUsers } from "../models/user.model.js";

const getLogin = (req, res) => {
  const date = new Date().toLocaleTimeString();
  if (req.session.user) {
   return res.redirect("/home");
  }
  return res.render("login", { error: null, time: date });
};

const postLogin = (req, res) => {
  const { username, password } = req.body;

  if (username === "" || password === "") {
   return res.render("login", {
      error: "Username and password should be need",
      time: null,
    });
  } else if (password.length < 6) {
    return res.render("login", {
      error: "Password should be greater than 6 characters",
      time: null,
    });
  }

  const user = findUsers(req.body);

  if (user) {
    req.session.user = user;
    return res.redirect("/home");
  } else {
    return res.render("login", { error: "Invalid credentials found", time: null });
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
  return res.render("home", { username: req.session.user.username });
};

const getIndex = (req, res) => {
 return res.redirect("home");
};

const PageNotFound = (req, res) => {
 return res.render("notfound");
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
