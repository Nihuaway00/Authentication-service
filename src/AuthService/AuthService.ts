import {IAuthService, ILoginReturns} from "./IAuthService";
import {ErrorHandler} from "../handlers/ErrorHandler/ErrorHandler";
import {Collection} from "../database/mongoDB/Collection";
import {MongoDB} from "../database/mongoDB/MongoDB";
import {IUser} from "../interfaces/IUser";

class AuthService implements IAuthService{
    async login(email: string, password: string): Promise<ILoginReturns>{
        throw new ErrorHandler(500, 'Login: no!');
    }

    async registration(name: string, email: string, password: string): Promise<void> {
        // const userCollection = MongoDB.getCollection<IUser>('users');
        // const userFetcher = new Collection<IUser>(userCollection);
        // const query = {name: "Troxya"};
        // const userDoc = await userFetcher.getOne(query);
        // console.log("user:", userDoc);
        throw new ErrorHandler(500, 'registration: no!');
    }

    async restorePassword(newPassword: string): Promise<void> {
        throw new ErrorHandler(500, 'restorePassword: no!');
    }

    async sendRestoreLink(email: string): Promise<void> {
        throw new ErrorHandler(500, 'sendRestoreLink: no!');
    }
}

export default new AuthService();