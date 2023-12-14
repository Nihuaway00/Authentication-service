import { Router } from "express";
import {authRoutes} from "./authRoutes";
import {userRoutes} from "./userRoutes";


export const createRoutes = (router: Router) => {
	authRoutes(router);
	userRoutes(router);
}