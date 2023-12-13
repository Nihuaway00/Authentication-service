import { Router } from "express";
import AuthController from "./AuthController/AuthController";
import {ValidationHandler} from "./handlers/ValidationHandler/ValidationHandler";
import {NextFunction, Response, Request} from "express-serve-static-core";


export const createRoutes = (router: Router) => {
	const registrationValidate = new ValidationHandler(['name', 'email', 'password'])
	const loginValidate = new ValidationHandler(['email', 'password'])
	const sendRestoreTokenValidate = new ValidationHandler(['email'])
	const restorePasswordValidate = new ValidationHandler(['password'])


	router.post('/login',
		(req: Request, res: Response, next: NextFunction) => loginValidate.exist(req, res, next),
		AuthController.login
	);
	router.post('/registration',
		(req: Request, res: Response, next: NextFunction) => registrationValidate.exist(req, res, next),
		AuthController.registration
	);
	router.post('/sendRestoreToken',
		(req: Request, res: Response, next: NextFunction) => sendRestoreTokenValidate.exist(req, res, next),
		AuthController.sendRestoreLink
	);
	router.post('/restorePassword',
		(req: Request, res: Response, next: NextFunction) => restorePasswordValidate.exist(req, res, next),
		AuthController.restorePassword
	);
}