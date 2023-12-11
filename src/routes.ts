import { Router } from "express";
import AuthController from "./AuthController/AuthController";
import {ValidationHandler} from "./handlers/ValidationHandler/ValidationHandler";
import {NextFunction, Response, Request} from "express-serve-static-core";




export const createRoutes = (router: Router) => {
	const registrationValidate = new ValidationHandler(['name', 'email', 'password'])
	const loginValidate = new ValidationHandler(['email', 'password'])
	const sendRestoreTokenValidate = new ValidationHandler([])
	const restorePasswordValidate = new ValidationHandler([])

	router.post('/login',
		(req: Request, res: Response, next: NextFunction) => loginValidate.exist(req, res, next),
		AuthController.login);
	router.post('/registration',
		(req: Request, res: Response, next: NextFunction) => registrationValidate.exist(req, res, next),
		AuthController.registration);
	// router.post('/sendRestoreToken', sendRestoreTokenValidate.exist, AuthController.sendRestoreLink);
	// router.post('/restorePassword', restorePasswordValidate.exist, AuthController.restorePassword);
}