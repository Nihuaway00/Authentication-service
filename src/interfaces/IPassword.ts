import * as mongoDB from "mongodb";
import {ObjectId} from "mongodb";

export interface IPassword extends mongoDB.BSON.Document{
    _id?: string;
    userID: ObjectId;
    hashedValue: string;
}