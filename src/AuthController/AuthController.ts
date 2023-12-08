import {IAuthController} from "./IAuthController";
import {NextFunction,Request,Response} from "express-serve-static-core";
import {ErrorHandler} from "../handlers/ErrorHandler/ErrorHandler";
import AuthService from "../AuthService/AuthService";

class AuthController implements IAuthController{
    async login(req: Request, res: Response, next: NextFunction)  {
        try{
            const {email, password} = req.body;
            const {jwt, user} = await AuthService.login(email, password);

            res.send({user});
        }catch (e) {
            if(e instanceof Error){
                console.log("Error: ", e.message)
            }
        }
    }

    async registration(req: Request, res: Response, next: NextFunction){
        try{
            const {name, email, password} = req.body;
            await AuthService.registration(name, email, password);
            res.sendStatus(201);
        }catch (e) {
            if(e instanceof Error){
                console.log("Error: ", e.message)
            }
        }
    }

    async restorePassword(req: Request, res: Response, next: NextFunction) {
        try{
            const {name, email, password} = req.body;

            res.sendStatus(201);
        }catch (e) {
            if(e instanceof Error){
                console.log("Error: ", e.message)
            }
        }
    }

    async sendRestoreLink(req: Request, res: Response, next: NextFunction) {
        try{
            const {name, email, password} = req.body;

            res.sendStatus(201);
        }catch (e) {
            if(e instanceof Error){
                console.log("Error: ", e.message)
            }
        }
    }
}

export default new AuthController();