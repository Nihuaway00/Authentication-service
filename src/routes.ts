import { Router } from "express";
import AuthController from "./AuthController/AuthController";

export const createRoutes = (router: Router) => {
	router.post('login');
	router.post('/registration', AuthController.registration);
	router.post('sendRestoreToken');
	router.post('restorePassword');
}