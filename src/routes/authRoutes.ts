import {Router} from "express";
import {ValidationHandler} from "../handlers/ValidationHandler/ValidationHandler";
import {NextFunction, Request, Response} from "express-serve-static-core";
import AuthController from "../controllers/AuthController/AuthController";

export const authRoutes = (router: Router) => {
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
    router.get('/logout',
        AuthController.logout
    );
    router.post('/restore',
        (req: Request, res: Response, next: NextFunction) => sendRestoreTokenValidate.exist(req, res, next),
        AuthController.sendRestoreLink
    );
    router.post('/restore/token/:restoreToken',
        (req: Request, res: Response, next: NextFunction) => restorePasswordValidate.exist(req, res, next),
        AuthController.restorePassword
    );
}
