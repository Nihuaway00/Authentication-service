import {ObjectId, UUID} from "mongodb";
import jwt from "jsonwebtoken"
import {ErrorHandler} from "../../handlers/ErrorHandler/ErrorHandler";
import {MongoDB} from "../../database/mongoDB/MongoDB";
import {IUser} from "../../interfaces/IUser";
import {Collection} from "../../database/mongoDB/Collection";
class UserService{
    async getUser(token: string){
        const decoded = jwt.decode(token, {json: true});
        if(!decoded) throw new ErrorHandler(500, "Error with decode token")

        const userCollection = MongoDB.getCollection<IUser>('users');
        const userFetcher = new Collection<IUser>(userCollection);
        const userDoc = await userFetcher.getOne({_id: new ObjectId(decoded._id)});
        if(!userDoc) throw new ErrorHandler(500, "DB error")
        return {user: userDoc};
    }

}

export default new UserService();