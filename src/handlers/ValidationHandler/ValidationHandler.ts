import {NextFunction,Request,Response} from "express-serve-static-core";
import {ErrorHandler} from "../ErrorHandler/ErrorHandler";


export class ValidationHandler{
    filter: object;

    constructor(filter: object) {
        this.filter = filter
    }

    exist(req: Request, res: Response, next: NextFunction){
        try{
            Object.keys(this.filter).map(key => {
                if(req.body[key] === undefined){
                    console.log(req.body, key)
                    throw new ErrorHandler(400, `Invalid input data: ${key}`)
                }
            })

            next()
        }catch (e) {
            if(e instanceof ErrorHandler){
                console.log("Error: ", e.message);
                res.status(e.status).send(e.message);
            }
        }
    }
}

