import { Router } from "express";
import {
  getLogin,
  home,
  postLogin,
  postLogout,
  getIndex,
  PageNotFound,
  getContact,
} from "../services/auth.services.js";
import { isAuthenticted } from "../middleware/auth.middleware.js";

const router = Router();
router.get("/", isAuthenticted, getIndex);
router.get("/login", getLogin);
router.post("/login", postLogin);
router.get("/home", isAuthenticted, home);
router.post("/logout", postLogout);
router.get("/contact", getContact);
router.get("*", isAuthenticted, PageNotFound);

export default router;
