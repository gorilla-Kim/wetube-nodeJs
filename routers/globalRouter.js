import express from "express";
import routes from "../routes";
import { home, search } from "../controller/videoController";
import { getJoin, postJoin, getLogin, postLogin, logout } from "../controller/userController";

const globalRouter = express.Router();

globalRouter.get(routes.join, getJoin);
globalRouter.post(routes.join, postJoin, postLogin);

globalRouter.get(routes.login, getLogin);
globalRouter.post(routes.login, postLogin);

globalRouter.get(routes.logout, logout);

globalRouter.get(routes.home, home);
globalRouter.get(routes.search, search);

export default globalRouter;