import { Router } from "express";
import AuthController from "./AuthController/AuthController";
import {ValidationHandler} from "./handlers/ValidationHandler/ValidationHandler";
import {NextFunction, Response, Request} from "express-serve-static-core";

const registrationValidate = new ValidationHandler({ name: "",email: "", password: ""})
const loginValidate = new ValidationHandler({ email: "", password: ""})
const sendRestoreTokenValidate = new ValidationHandler({ })
const restorePasswordValidate = new ValidationHandler({ })

export const createRoutes = (router: Router) => {
	router.post('login', loginValidate.exist);
	router.post('/registration', registrationValidate.exist, AuthController.registration);
	router.post('sendRestoreToken', sendRestoreTokenValidate.exist);
	router.post('restorePassword', restorePasswordValidate.exist);
}