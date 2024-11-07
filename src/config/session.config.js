import session from "express-session";

export const sessionConfig = session({
  secret: "process.env.SECRET",
  saveUninitialized: false,
  rolling: true,
  resave: true,
  cookie: {
    maxAge: 50 * 1000,
    sameSite: "strict",
    httpOnly: true,
  },
});
