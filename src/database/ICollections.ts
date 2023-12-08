import * as mongoDB from "mongodb";
import {IUser} from "../interfaces/IUser";

export interface ICollections{
    users?: mongoDB.Collection<IUser>;
}