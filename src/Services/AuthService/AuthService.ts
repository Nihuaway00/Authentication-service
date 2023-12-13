import {ErrorHandler} from "../../handlers/ErrorHandler/ErrorHandler";
import {Collection} from "../../database/mongoDB/Collection";
import {MongoDB} from "../../database/mongoDB/MongoDB";
import {IUser} from "../../interfaces/IUser";
import bcrypt from 'bcrypt';
import {IPassword} from "../../interfaces/IPassword";
import {ObjectId, UUID} from "mongodb";
import jwt from "jsonwebtoken"

class AuthService{
    async login(email: string, password: string){
        //check email

        const userCollection = MongoDB.getCollection<IUser>('users');
        const userFetcher = new Collection<IUser>(userCollection);
        const userDoc = await userFetcher.getOne({email});

        const passwordCollection = MongoDB.getCollection<IPassword>('passwords');
        const passwordFetcher = new Collection<IPassword>(passwordCollection);
        const passDoc = await passwordFetcher.getOne({userID: userDoc?._id})

        const saltRounds: number = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password, salt);

        if(!passDoc) throw new ErrorHandler(500, "Error with DB")

        if(!bcrypt.compareSync(password, passDoc.hashedValue)){
            throw new ErrorHandler(400, "Password is incorrect")
        }

        const token: string = jwt.sign({userID: userDoc?._id, email: email}, "secretJWTtOkkEN", {expiresIn: '30s'});
        return {token, user: userDoc as IUser}
    }

    async registration(name: string, email: string, password: string) {
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
                    throw new ErrorHandler(500, "Hash pass")
                }
                else{
                    passwordFetcher.insertOne({userID, hashedValue: hash})
                }
            })
        })

        await userFetcher.insertOne({name, email}, userID);
    }

    async sendRestoreLink(email: string){
        const userCollection = MongoDB.getCollection<IUser>('users');
        const userFetcher = new Collection<IUser>(userCollection);
        const userDoc = await userFetcher.getOne({email});

        if(!userDoc) throw new ErrorHandler(404, "User with this email not found")
        const restoreToken = jwt.sign({userID: userDoc?._id, email: email}, "secretJWTtOkkEN2222", {expiresIn: '10m'});
        return {restoreToken};
    }

    async restorePassword(restoreToken: string, newPassword: string){
        const verified = jwt.verify(restoreToken, "secretJWTtOkkEN2222");
        if(!verified) throw new ErrorHandler(400, "Restore token is invalid");
        const decoded = jwt.decode(restoreToken, {json: true});
        if(!decoded) throw new ErrorHandler(500, "Error with decode restore token")

        const passwordCollection = MongoDB.getCollection<IPassword>('passwords');
        const passwordFetcher = new Collection<IPassword>(passwordCollection);
        const userID = new ObjectId(decoded.userID);
        const passwordDoc = await passwordFetcher.getOne({userID});

        if(!passwordDoc) throw new ErrorHandler(500, "DB error")

        const saltRounds: number = 10;
        bcrypt.genSalt(saltRounds, function (err, salt) {
            bcrypt.hash(newPassword, salt, async function (err, hash){
                if(err){
                    throw new ErrorHandler(500, "Hash pass")
                }
                else{
                    await passwordFetcher.updateOne({userID}, {hashedValue: hash})
                }
            })
        })
    }
}

export default new AuthService();