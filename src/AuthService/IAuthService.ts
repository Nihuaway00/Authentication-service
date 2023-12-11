import {IUser} from "../interfaces/IUser";

export interface ILoginReturns{
    token: string;
    user: IUser;
}



export interface IAuthService{
    login(email: string, password: string): Promise<ILoginReturns>;
    registration(name: string, email: string, password: string): void;
    sendRestoreLink(email: string): void;
    restorePassword(newPassword: string): void;
}