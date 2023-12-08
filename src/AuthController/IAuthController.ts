import {NextFunction, Request, Response} from "express-serve-static-core";

export interface IAuthController {
    login(req: Request, res: Response, next: NextFunction): void;
    registration(req: Request, res: Response, next: NextFunction): void;
    sendRestoreLink(req: Request, res: Response, next: NextFunction): void;
    restorePassword(req: Request, res: Response, next: NextFunction): void;
}