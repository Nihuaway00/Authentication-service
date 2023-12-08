import * as mongoDB from "mongodb";

export interface IUser extends mongoDB.BSON.Document {
    _id?: string;
    name: string;
    email: string;
}