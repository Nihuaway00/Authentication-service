import {NextFunction,Request,Response} from "express-serve-static-core";
import {ErrorHandler} from "../ErrorHandler/ErrorHandler";
import {type} from "os";


export class ValidationHandler{
    filter: object;

    constructor(filter: object) {
        this.filter = filter
    }

    exist(req: Request, res: Response, next: NextFunction){
        Object.keys(this.filter).map(key => {
            if(typeof req.body[key] !== typeof key || req.body[key] === undefined){
                console.log(req.body, key)
                throw new ErrorHandler(400, `Invalid input data: ${key}`)
            }
        })

        next()
    }
}

