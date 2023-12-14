import {NextFunction, Request, Response} from "express-serve-static-core";
import {ErrorHandler} from "../../handlers/ErrorHandler/ErrorHandler";
import jwt from "jsonwebtoken"
import UserService from "../../Services/UserService/UserService";

const JWT_SECRET: string = process.env.JWT_SECRET || "default";

class UserController{
    async getUser(req: Request, res: Response, next: NextFunction){
        try{
            const {token} = req.cookies;
            jwt.verify(token, JWT_SECRET,{}, ((err) => {
                if(err) throw ErrorHandler.notVerified();
            }));

            const {user} = await UserService.getUser(token);
            res.send({user});
        }catch (e) {
            if(e instanceof ErrorHandler){
                if(e.status === 401) res.clearCookie('token');
                console.log("Error: ", e.message);
                res.status(e.status).send(e.message);
            }
        }
    }
}

export default new UserController();