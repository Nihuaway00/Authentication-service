import {IAuthService, ILoginReturns} from "./IAuthService";
import {ErrorHandler} from "../handlers/ErrorHandler/ErrorHandler";
import {Collection} from "../database/mongoDB/Collection";
import {MongoDB} from "../database/mongoDB/MongoDB";
import {IUser} from "../interfaces/IUser";
import bcrypt from 'bcrypt';
import {IPassword} from "../interfaces/IPassword";
import {ObjectId, UUID} from "mongodb";

class AuthService implements IAuthService{
    async login(email: string, password: string): Promise<ILoginReturns>{
        throw new ErrorHandler(500, 'Login: no!');
    }

    async registration(name: string, email: string, password: string): Promise<void> {
        const userCollection = MongoDB.getCollection<IUser>('users');
        const userFetcher = new Collection<IUser>(userCollection);

        const query = {email};
        const userDoc = await userFetcher.getOne(query);
        if(userDoc) throw new ErrorHandler(400, "This email is already in use.");

        const passwordCollection = MongoDB.getCollection<IPassword>('passwords');
        const passwordFetcher = new Collection<IPassword>(passwordCollection);

        const userID = new ObjectId()
        const saltRounds: number = 10;
        bcrypt.genSalt(saltRounds, function (err, salt) {
            bcrypt.hash(password, salt, function (err, hash){
                if(err){
                    console.log(err);
                }
                else{
                    passwordFetcher.insertOne({userID, hashedValue: hash})
                }
            })
        })

        await userFetcher.insertOne({name, email}, userID);
    }

    async restorePassword(newPassword: string): Promise<void> {
        throw new ErrorHandler(500, 'restorePassword: no!');
    }

    async sendRestoreLink(email: string): Promise<void> {
        throw new ErrorHandler(500, 'sendRestoreLink: no!');
    }
}

export default new AuthService();