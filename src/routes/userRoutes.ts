import {Router} from "express";
import UserController from "../controllers/UserController/UserController";

export const userRoutes = (router: Router) => {
    router.get('/user', UserController.getUser);
}